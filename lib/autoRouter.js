/**
 * express-file-autorouter
 * Copyright(c) 2017 Perez Yuan <yzmspirit@gmail.com>
 * version 1.0.1
 * MIT Licensed
 */
'use strict';

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
    
    this.allRouters = {};
    this.init();
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
        let files = fs.readdirSync(routerPath);
        me.createRouter(routerPath, files);
    },
    createRouter(routerPath, files) {
        let me = this;
        let app = me.options.app;
        files.forEach((file) => {
            let filePath = path.join(routerPath, file);
            if (fs.statSync(filePath).isDirectory()) {
                me.getFiles(filePath)
            } else {
                // remove rootPath and suffix
                let routerName = filePath.substring(
                        me.options.routerPath.length, 
                        filePath.lastIndexOf('.')
                    );
                let router = require(filePath);
                if (me.isRouter(router)) {
                    routerName = me.options.alias[routerName] || routerName;
                    if (app) {
                        app.use(routerName, router);
                    } else {
                        console.log('No app!Please useing getRouters() method')
                    }
                    me.allRouters[routerName] = router;
                }
            }
        });
    },
    isRouter(router) {
        return typeof router.route === 'function';
    },
    getRouters() {
        for(let key in this.allRouters) {
            return this.allRouters;
        }
        return null;
        // return {};
    }
}

module.exports = AutoRouter;