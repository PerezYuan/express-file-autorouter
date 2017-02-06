var AutoRouter = require('./index');
var path = require('path');
var app = require('express')();

var autoRouter = new AutoRouter({
    routerPath: path.resolve(__dirname, 'routerPath'), //存放路由的path
    app: app, //express app
    alias: {}
});

//console.log(Object.keys(autoRouter.getRouters()));