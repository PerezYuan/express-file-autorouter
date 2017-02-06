var AutoRouter = require('./index');
var path = require('path');
var app = require('express')();

console.log(path.resolve(__dirname, 'routerPath'));
var autoRouter = new AutoRouter({
    routerPath: path.resolve(__dirname, 'routerPath'), //存放路由的path
    app: app, //express app
    alias: {}
});