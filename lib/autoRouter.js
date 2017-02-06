/**
 * mocha
 * Copyright(c) 2017 Perez Yuan <yzmspirit@gmail.com>
 * MIT Licensed
 */
const fs = require('fs');

function AutoRouter (options) {
    this.options = Object.assign({
        //routers path
        routerPath: null,
        // the express app object
        app: null,
        //routers alias
        alias: {} 
    }, options)

    this.init();
}

AutoRouter.prototype = {
    init() {
        var me = this;
        let options = me.options;
        if(!options.routerPath) {
            throw new Error('Must need routerPath');
        } else {
            me.createRouters();
        }
    },
    createRouters() {
        var me = this;
        new Promise((resolve, reject) => {
            fs.readdir(me.options.routerPath, function(err, files) {
                if (err) {
                    throw new Error(err);
                    reject();
                } else {
                    resolve(files);
                }
            })
        }).then()
    }
}

module.exports = AutoRouter;