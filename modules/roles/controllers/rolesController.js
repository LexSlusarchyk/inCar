'use strict';

const app = alias.require('@root/app'),
    helper = require('../../../helper');

module.exports = {
    getList(req, res) {
        app.dbWeb.select().from('Roles').all()
            .then(function(roles) {
                roles = _.filter(roles, function(role) {
                    return role.name !== 'guest';
                });

                res.send(helper.filterDbData(roles, ['extraData']))
            })
            .catch(res.sendError);
    }
};