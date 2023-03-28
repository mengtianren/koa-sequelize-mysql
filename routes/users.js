/**用户相关 */
var router = require('koa-router')();
const { dict, user, userProduct, product } = require('../models');
router.prefix('/api/user');
/**登录 username password */

/**获取登录用户信息 */
router.get('/info', async (ctx) => {
  const { user: users } = ctx.state
  ctx.success(users, '获取成功')
});
/** 用户信息更新 */
router.post('/update', async (ctx) => {
  const { request: { body: { password = '1234567', sex = '1', username = '神秘用户', isAdmin = '0', address = '客户标注' } = {} } = {} } = ctx;
  const { user: { id = '' } = {} } = ctx.state
  if (!id) {
    return ctx.error('请选择用户', 500)
  }
  const myUser = await user.findOne({
    where: { id },
    attributes: {
      exclude: ['password']
    }
  });
  await myUser.update({
    isAdmin,
    username,
    sex,
    password,
    address
  })
  ctx.success(myUser, '修改成功')
});
// 获取用户所有预订房间
router.get('/product', async (ctx) => {
  const { state: { user: { id = '' } = {} } = {} } = ctx;
  const list = await userProduct.findAll({
    where: { uid: id },
    include: {
      association: userProduct.belongsTo(product, { foreignKey: 'pid', targetKey: 'id', }),
      attributes: {
        exclude: ['id']
      }
    }
  });
  ctx.success(list);
})




module.exports = router;
