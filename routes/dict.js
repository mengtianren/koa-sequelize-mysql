/**字典相关 */
var router = require('koa-router')();

router.prefix('/api/dict');


//获取字典
router.get('/', async (ctx) => {
    ctx.body = await '获取字典'
  });
/**修改字典 */
router.put('/', async (ctx) => {
    ctx.body = await '修改字典'
  });
  /**添加字典 */
router.post('/', async (ctx) => {
    ctx.body = await '添加字典'
  });
  /**删除字典 */
  router.post('/', async (ctx) => {
    ctx.body = await '删除字典'
  });

module.exports = router;
