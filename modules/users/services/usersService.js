/**
 * Created by ivan.makarov@mev.com on 15.03.16.
 */
'use strict';

const app = alias.require('@root/app'),
    helper = alias.require('@root/helper'),
    User = require('../models/User');

module.exports = {
    validatorRules: {
        email: {
            notEmpty: true,
            isEmail: true,
            isLength: { options: [{min: 3, max: 254}] },
            errorMessage: '"email" in incorrect format'
        },
        password: {
            notEmpty: true,
            isLength: {
                options: [{min: 6}],
                errorMessage: 'Password should be 6 symbols minimum'
            }
        },
        firstName: {
            isLength: {
                options: [{max: 120}],
                errorMessage: '"first name" should have maximum 120 symbols'
            }
        },
        lastName: {
            isLength: {
                options: [{max: 120}],
                errorMessage: '"last name" should have maximum 120 symbols'
            }
        }
    },

    list,
    getUsers
};

function list(propertyList) {
    if (!propertyList) { propertyList = ['@rid', 'email']; }
    var properties = propertyList.join(', ');

    return app.dbWeb.select(properties).from('Users').all()
        .then(function(users) {
            return _.map(users, (user) => new User(user));
        });
}

function getUsers(userRID) {
    var q = 'SELECT ' + User.safePropertyList + ' FROM Users';

    if (userRID) { q += ' WHERE @rid=' + userRID; }

    return app.dbWeb.query(q).then(function(results) {
        return helper.filterDbData(results, ['@type']);
    });
}