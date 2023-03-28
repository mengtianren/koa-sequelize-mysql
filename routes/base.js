var router = require('koa-router')();
const { dict, user, product } = require('../models');
const _ = require('lodash')
const appConfig = require('../config/appConfig.json');
const jsonwebtoken = require('jsonwebtoken');
router.prefix('/api/base');

router.get('/', (ctx) => {
  ctx.body = '欢迎访问'
})
/**
 * 登录
 * @param {string}
 * phone:string, password:string
 */
router.post('/login', async (ctx) => {
  const { request: { body: { phone = null, password = null } = {} } = {} } = ctx
  if (_.isNull(phone) || _.isNull(password)) {
    ctx.error('请输入手机号或密码', 500)
  } else {
    const users = await user.findOne({
      where: { phone, password },
      attributes: {
        exclude: ['password']
      }
    });
    if (_.isNull(users)) {
      ctx.error('账号或密码错误', 500)
    } else {
      const token = jsonwebtoken.sign(users.toJSON(), appConfig.appSecret, { expiresIn: '1h' })

      ctx.success({ ...users.dataValues, token }, '登录成功')
    }
  }
});
/**
 * 注册
 */
router.post('/register', async (ctx) => {
  const { request: { body: { phone = null, password = null, sex = '1', username = '神秘用户', isAdmin = '0' } = {} } = {} } = ctx
  if (_.isNull(phone) || _.isNull(password)) {
    ctx.error('请输入手机号或密码', 500)
  } else {
    const users = await user.findOne({
      where: { phone },
    });
    console.log(users)
    if (_.isNull(users)) {
      console.log(phone, password, sex, username)
      await user.create({
        phone, password, sex, username, isAdmin
      });
      ctx.success({}, '用户创建成功')

    } else {
      ctx.error('用户已存在', 500)
    }
  }
});
/** 酒店列表 */
router.get('/product', async (ctx) => {
  const list = await product.findAll({
    where: {}
  });
  ctx.success(list, '获取列表成功')
})
/**酒店详情 */

router.get('/product/detail', async (ctx) => {
  const { query = {} } = ctx
  const data = await product.findOne({
    where: query
  });

  if (_.isNull(data)) {
    ctx.error('获取详情失败', 500)
  } else {
    ctx.success(data, '获取详情成功')
  }

})





//请求验证码
router.get('/code', async (ctx) => {
  await dict.create({ key: 2, value: '那么' })
  const data = await dict.findAll()
  console.log(data)
  ctx.body = data
});

// //获取字典
// router.get('/dict', async (ctx) => {
//   ctx.body = await '验证码'
// });
// //修改字典
// router.get('/dict', async (ctx) => {
//   ctx.body = await '验证码'
// });

module.exports = router;
