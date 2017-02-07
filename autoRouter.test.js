var AutoRouter = require('./index');
var path = require('path');
var app = require('express')();

var autoRouter = new AutoRouter({
    routerPath: path.resolve(__dirname, 'routerPath'),
    app: app,
    alias: {
        '/router1' : '/change1'
    }
});

console.log(Object.keys(autoRouter.getRouters()));

app.listen(4000, function () {
  console.log('Example app listening on port 4000!');
});