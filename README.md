# Installation
```shell script
# npm ...
npm i koa-router-expand

#yarn 
yarn add koa-router-expand
```

# Usage


```
# structure

└─ index.js
├─ controller
  └─ user
    └─ index.js
  ├─ post.js
  └─ get.js
├─ package.json
├─ README.md
└─ yarn.lock

```

```javascript

// index.js

const
  Koa = require('koa')
  , KoaRouter = require("koa-router")
  , koaBody = require('koa-body')
  , koaLogger = require('koa-logger')
  , routerExpand = require("koa-router-expand")
  , router = routerExpand(KoaRouter, '/prefix', './controller')
  , app = new Koa()

app
  .use(koaLogger())
  .use(koaBody())
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(3000)

/*
node ./index.js

process controller: F:/www/expand/controller/get.js...
register URL mapping: GET /prefix/xx
register URL mapping: GET /prefix/xxx
process controller: F:/www/expand/controller/post.js...
register URL mapping: PUT /prefix/xx/xx
register URL mapping: POST /prefix/pp
register URL mapping: POST /prefix/ppp
register URL mapping: DELETE /prefix/dd/dd
process controller: F:/www/expand/controller/user/index.js...
register URL mapping: POST /prefix/user/info
register URL mapping: POST /prefix/user/friends

*/
```

```javascript

// ./controller/get.js

async function xx(ctx) {
  // Do something....
}

function xxx(ctx) {
  ctx.body = {
    status: 0,
    result: 'xxx',
    info: ''
  }
}

module.exports = {
  'GET /xx': xx,
  'GET /xxx': xxx
}

```

```javascript

// ./controller/post.js

async function pp(ctx) {
  // Do something....
}

function ppp(ctx) {
  ctx.body = {
    status: 0,
    result: 'ppp',
    info: ''
  }
}

async function putXx(ctx) {
  // Do something....
}

function delXx(ctx) {
  // Do something....
}

module.exports = {
  'PUT /xx/xx': putXx,
  'POST /pp': pp,
  'POST /ppp': ppp,
  'DELETE /dd/dd': delXx
}

```

```javascript

// ./controller/user/index.js

async function getFriends(ctx) {
  // Do something....
}

async function userInfo(ctx) {
  // Do something....
}

module.exports = {
  'POST /user/info': userInfo,
  'POST /user/friends': getFriends
}

```