/**
 * mocha
 * Copyright(c) 2017 Perez Yuan <yzmspirit@gmail.com>
 * MIT Licensed
 */
const fs = require('fs');
const path = require('path');

function AutoRouter(options) {
    this.options = Object.assign({
        //routers path
        routerPath: null,
        // the express app object
        app: null,
        //routers alias
        alias: {}
    }, options)

    this.init();
    this.allRoutes = {};
}

AutoRouter.prototype = {
    init() {
        let me = this;
        let options = me.options;
        if (!options.routerPath) {
            throw new Error('Must need routerPath');
        } else {
            me.getFiles(me.options.routerPath);
        }
    },
    getFiles(routerPath) {
        let me = this;
        new Promise((resolve, reject) => {
            fs.readdir(routerPath, function (err, files) {
                if (err) {
                    throw new Error(err);
                    reject();
                } else {
                    resolve(files);
                }
            })
        }).then((files) => {
            me.createRouter(routerPath, files);
        })
    },
    createRouter(routerPath, files) {
        let me = this;
        let app = me.options.app;
        files.forEach((file) => {
            let filePath = path.join(routerPath, file);
            if (fs.statSync(filePath).isDirectory()) {
                me.getFiles(filePath)
            } else {
                let fileName = path.basename(file, '.js');
                var router = require(filePath);
                if (me.isRouter(router)) {
                    let url = path.join('/' + fileName);
                    url = me.options.alias[url] || url;
                    me.app && me.app.use(url, router);
                    me.allRoutes[url] = router;
                }
            }
        });
    },
    isRouter(router) {
        return typeof router.route === 'function';
    }
}

module.exports = AutoRouter;