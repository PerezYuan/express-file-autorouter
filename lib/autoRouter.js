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
        let me = this;
        let options = me.options;
        if(!options.routerPath) {
            throw new Error('Must need routerPath');
        } else {
            me.getFiles();
        }
    },
    getFiles() {
        let me = this;
        new Promise((resolve, reject) => {
            fs.readdir(me.options.routerPath, function(err, files) {
                if (err) {
                    throw new Error(err);
                    reject();
                } else {
                    resolve(files);
                }
            })
        }).then((files) => {
            me.createRouter(files);
        })
    },
    createRouter(files) {
        let me = this;
        console.log(files);
        files.forEach((file) => {
            console.log(path.join(me.options.routerPath, file));
            // let stat = fs.statSync(path.join(me.options.routerPath, file));
            // if (stat.isDirectory()) {
            //     me.createRouter(file)
            // }
        }, this);
    },
    isRouter(router){
        return typeof router.route === 'function';
    }
}

module.exports = AutoRouter;