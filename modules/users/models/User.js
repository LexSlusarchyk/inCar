'use strict';

let inject =  ['app', 'Promise'];

const app = require('../../../app'),
    Promise = require('bluebird'),
    Role = alias.require('@module/roles').models.Role,
    jwt = require('jsonwebtoken'),
    bcrypt = require('bcrypt'),
    uuid = require('node-uuid');

class User extends app.core.Model {
    constructor(params) {
        super();

        this.id = '';
        this.email = '';
        this.password = '';
        this.imageurl = '';
        this.firstname = '';
        this.lastname = '';
        this.country = '';
        this.region = '';
        this.gender = '';
        this.age = '';
        this.createdat = '';
        this.role = '';
        this.physicalAddress = '';
        this.version = '';
        this.isActivated = params.isActivated ? 1 : 0;
        this.userSteam = '';
        this.userXbox = '';
        this.userPs = '';

        this.init(params);
    }

    afterInit(params) {
        var root = this;

        if (params.id) { this.id = params.id; }
        if (params.password) { this.encodePassword(); }

        if (!params.createdAt) {
            this.createdAt = new Date().getTime();
        }

        if (!params.role) {
            this.role = 'user';
        }

        root.isActivated = root.isActivated ? 1 : 0;

        if ( !params['@version'] ) {
            this.version = 1;
        }
    }
    
    load() {
        var root = this;
        
        if (!root.id && !root.email) {
            throw new Error('Missed required arguments');
        }
        
        var uniqueParams = {};
        
        if (root.id) {
            uniqueParams.id = root.id;
        } else if (checkWithPass && root.email && root.password) {
            uniqueParams = _.pick(root, ['email', 'password'])
        } else {
            uniqueParams.email = root.email;
        }

        return app.dbWeb.select('*, role.* as role_, @version as version').from('users').where(uniqueParams).limit(1).one().then(function(userRecord) {
            if (userRecord) {
                root.init(userRecord);
                return root;
            } else {
                if (checkWithPass) {
                    return Promise.reject({
                        code: 'email_password_incorrect',
                        message: 'Email and password combination was incorrect'
                    });
                } else {
                    return Promise.reject({ code: 'db_record_not_found' });
                }
            }
        });
    }

    /**
     * Check existing user record in database
     * @returns {Promise|true}  rejected promise or true
     */
    checkExisting() {
        var root = this;
        var whereCondition = root['@rid'] ? `@rid=${root['@rid']}` : `email="${root.email}"`;
        var query = `SELECT count(*) FROM users WHERE ${whereCondition} LIMIT 1`;

        return app.dbWeb.query(query)
            .then(function(results) {
                return !!results[0].count;
            });
    }

    create() {
        var root = this;
        var newUserData = root.propertiesToDBDataset().join(', ');
        var query = 'INSERT INTO users SET ' + newUserData;

        return query;
    }



    update(params) {
        var root = this;
        var newUserData = root.propertiesToDBDataset(true).join(', ');
        var query = 'UPDATE users SET ' + newUserData + 'WHERE id="' + root.id + '" LIMIT 1';

        return query;
    }

    generateToken() {
        var root = this;
        var jti = uuid.v4();
        return jwt.sign(
            { jti: jti, id: root.id, iat: Date.now(), iss: root.email, role: root.role },
            "$2a$10$Hz1NaikezZdwlINa13ymo.",
            { expiresIn: '30d' }
        )
    }
}

User.prototype.safePropertyList = ['@rid', 'role["@rid"]', 'firstName', 'lastName', 'email', 'createdAt'];
User.prototype.getUserRID = getUserRID;
User.prototype.encodePassword = encodePassword;
User.prototype.propertiesToDBDataset = propertiesToDBDataset;

User.safePropertyList = ['id', 'role', 'firstName', 'lastName', 'email', 'createdAt'];
User.getUserRID = getUserRID;
User.encodePassword = encodePassword;

/**
 * Get user RID by email
 * @param ridOrEmail
 * @returns {Promise}
 */
function getUserRID(ridOrEmail) {
    var root;

    if (this instanceof User) {
        root = this;
        ridOrEmail = this['@rid'] || this.email;
    }

    if (!ridOrEmail) { throw new Error('Missed required argument'); }

    if (app.helper.isRID(ridOrEmail)) {
        return Promise.resolve(ridOrEmail)
    } else {
        return app.dbWeb.select().from('users').where({email: ridOrEmail}).one().then(function(user) {
            if (root) { root.init(user); }
            return user['@rid'];
        })
    }
}

function encodePassword(rawPasswordArg) {
    var rawPassword = rawPasswordArg || this.password;
    var encryptedPassword = bcrypt.hashSync(rawPassword, "$2a$10$EWsNxqKs2OgbEtU1Xkqln.");

    if (!rawPasswordArg) { this.password = encryptedPassword; }

    return encryptedPassword;
}

function propertiesToDBDataset(excludePassword) {
    var root = this;
    var userProperties = [];

    userProperties.push('`email`="' + root.email + '"');
    userProperties.push('`role`="' + root.role + '"');
    userProperties.push('`createdAt`="' + root.createdat + '"');

    if (!excludePassword) {
        userProperties.push('`password`="' + root.password + '"');
    }

    if (root.imageurl) { userProperties.push('`imageUrl`="' + root.imageurl + '"'); }
    if (root.firstname) { userProperties.push('`firstName`="' + root.firstname + '"'); }
    if (root.lastname) { userProperties.push('`lastName`="' + root.lastname + '"'); }
    if (root.country) { userProperties.push('`country`="' + root.country + '"'); }
    if (root.region) { userProperties.push('`region`="' + root.region + '"'); }
    if (root.gender) { userProperties.push('`gender`="' + root.gender + '"'); }
    if (root.age) { userProperties.push('`age`="' + root.age + '"'); }
    if (root.physicalAddress) { userProperties.push('`physicalAddress`="' + root.physicalAddress + '"'); }
    if (root.version) { userProperties.push('`version`="' + root.version + '"'); }

    if (root.userSteam) { userProperties.push('`userSteam`="' + root.userSteam + '"'); }
    if (root.userXbox) { userProperties.push('`userXbox`="' + root.userXbox + '"'); }
    if (root.userPs) { userProperties.push('`userPs`="' + root.userPs + '"'); }

    return userProperties;
}

module.exports = User;
