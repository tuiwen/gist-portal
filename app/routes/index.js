'use strict';

const fs = require('fs');
const path = require('path');
const auth = require('basic-auth');
const Router = require('koa-router');

const router = new Router();

// Construct Gist instance
router.use(async (ctx, next) => {
  const credentials = auth(ctx.req);
  if (credentials) {
    try {
      ctx.auth = {
        username: credentials.name,
        password: credentials.pass
      };
      await next();
    } catch (error) {
      ctx.throw(error.status || 400, error.message || 'Bad request');
    }
  } else {
    ctx.set('WWW-Authenticate', 'Basic');
    ctx.status = 401;
    ctx.body = 'Unauthorized access.';
  }
});

fs.readdirSync(path.join(__dirname, '/')).forEach(file => {
  if (file.match(/\.js$/) !== null && file !== 'index.js') {
    const r = require('./' + file.substring(0, file.lastIndexOf('.')));
    router.use('/', r.routes(), r.allowedMethods());
  }
});

module.exports = router;
