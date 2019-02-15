'use strict';

const Router = require('koa-router');
const Gists = require('gists');

const router = new Router({prefix: 'gists'});

router.get('/', async ctx => {
  try {
    const gists = new Gists(ctx.auth);
    const res = await gists.list(ctx.auth.username);
    ctx.body = res.body;
  } catch (error) {
    ctx.throw(401, error);
  }
});

router.post('/', async ctx => {
  try {
    const gists = new Gists(ctx.auth);
    const res = await gists.create(ctx.request.body);
    ctx.body = res.body;
  } catch (error) {
    ctx.throw(400, error);
  }
});

router.get('/:id', async ctx => {
  try {
    const gists = new Gists(ctx.auth);
    const res = await gists.get(ctx.params.id);
    ctx.body = res.body;
  } catch (error) {
    ctx.throw(400, error);
  }
});

router.patch('/:id', async ctx => {
  try {
    const gists = new Gists(ctx.auth);
    const res = await gists.edit(ctx.params.id, ctx.request.body);
    ctx.body = res.body;
  } catch (error) {
    ctx.throw(400, error);
  }
});

module.exports = router;
