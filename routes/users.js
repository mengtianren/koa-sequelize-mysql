/**用户相关 */
var router = require('koa-router')();
const { dict, user } = require('../models');
router.prefix('/api/user');
/**获取登录用户信息 */
router.get('/info', async (ctx) => {
  console.log(ctx.state.user.phone)
  // try {
  const users = await user.findOne({
    where: {
      phone: ctx.state.user.phone
    },
    attributes: {
      excludes: ['password']
    }
  })
  ctx.body = users
  // } catch (error) {

  //   ctx.body = '错误'
  // }
  // console.log(333, users, 444)
  // if (users) {
  //   ctx.body = users
  // } else {
  //   ctx.body = '系统错误'
  // }

});

router.get('/bar', (next) => {
  this.body = 'this is a users/bar response!';
});



module.exports = router;
