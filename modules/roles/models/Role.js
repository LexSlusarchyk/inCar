/**
 * Created by ivan.makarov@mev.com on 15.03.16.
 */
'use strict';

const app = alias.require('@root/app'),
    helper = alias.require('@root/helper'),
    Promise = require('bluebird');

class Role extends app.core.Model {
    constructor(params) {
        super(params);

        this['@rid'] = null;
        this['@class'] = 'Roles';
        this.name = '';
        this.id = -1;

        this.init(params);
    }

    afterInit(params) {
        var root = this;

        if (_.isString(params)) {
            if (helper.isRID(params)) {
                root['@rid'] = params;
            } else {
                root.name = params;
            }
        }
    }

    load() {
        var root = this;

        return app.dbWeb.query(`SELECT FROM Roles WHERE name="${root.name}"`)
            .then(function(results) {
                if (results.length === 1) {
                    root = new Role(results[0]);
                    return root;
                } else {
                    return Promise.reject({
                        code: 'role_incorrect',
                        message: `There is no "${root.name}" role in the system`
                    });
                }
            });
    }
}

Role.prototype.toString = toString;
Role.toString = toString;

module.exports = Role;

//

function toString() {
    return this.name;
}