'use strict';

class Model {
    init(params) {
        this.beforeInit(params);

        if (params) { _.extend(this, _.pick(params, _.keys(this))); }

        this.afterInit(params);
    }

    beforeInit() {};
    afterInit() {};
}

module.exports = Model;