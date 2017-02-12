# An express auto-router through reading name of file #

# Installation #

Install package with NPM and add it to your dependencies:
```
npm install --save express-file-autorouter
```

# Usage #
If your directory of saving routes like this:
```
project
│
└─routerPath
    │  router1.js
    │  router2.js
    │  router3.js
    │
    └─ routerDir
         router4.js
         router5.js
```

In `app.js` or routes init file:

```
var AutoRouter = require('express-file-autorouter');
var path = require('path');
var app = require('express')();

var autoRouter = new AutoRouter({
    routerPath: path.resolve(__dirname, 'routerPath'),
    app: app,
    alias: {
        '/routerDir/router5' : '/change5'
    }
});

console.log(Object.keys(autoRouter.getRouters()));
```

Now `express-file-autorouter` will create the following routes:
```
[
	'/router1',   //alias: router1 => change1
	'/router2',      
	'/router3',
	'/routerDir/router4',
	'/change5'
]
```