# An express auto-router through reading name of file #

# Installation #

Install package with NPM and add it to your dependencies:
```
npm install --save express-file-autorouter
```

# Usage #
If your directory to save routes like this:
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
```

In `app.js`:

```
var AutoRouter = require('express-file-autorouter');
var autoRouter = new AutoRouter({
    routerPath: path.resolve(__dirname, 'routerPath'), //routers path
    app: app, //express app
    alias: {
        '/router1' : '/change1'
    }
});
```

Now `express-file-autorouter` will create the following routes:
```
[
	'/change1',   //alias: router1 => change1
	'/router2',      
	'/router3',
	'/router4',
]
```