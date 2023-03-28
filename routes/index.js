var router = require('koa-router')();

router.get('/', async (ctx) => {
  ctx.body = 12121
});

router.get('/foo', async (ctx) => {
  console.log(ctx, '====')
  ctx.body = 12121

});

module.exports = router;
