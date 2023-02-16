var router = require('koa-router')();
const { dict, user } = require('../models');
const _ = require('lodash')
const appConfig = require('../config/appConfig.json');
const jsonwebtoken = require('jsonwebtoken');
router.prefix('/api/base');
/**
 * 登录
 * @param {string}
 * phone:string, password:string
 */
router.post('/login', async (ctx) => {
  const { request: { body: { phone = null, password = null } = {} } = {} } = ctx
  if (_.isNull(phone) || _.isNull(password)) {
    ctx.status = 500;
    ctx.body = await '请输入账号或密码'
  } else {
    const users = await user.findOne({
      where: { phone, password },
      attributes: {
        exclude: ['password']
      }
    });
    const sexs = await dict.findOne({
      where: { type: 'sex', key: users.sex },
    }) || { value: '' }

    if (_.isNull(users)) {
      ctx.status = 500;
      ctx.body = await '账号或密码错误'
    } else {
      const token = jsonwebtoken.sign({ phone: users.phone }, appConfig.appSecret, { expiresIn: '1h' })
      ctx.body = { ...users.dataValues, sexName: sexs.value, token }
    }
  }

  // console.log(phone, password);
  // ctx.body = await '请输入账号密码'
});
//请求验证码
router.get('/code', async (ctx) => {
  await dict.create({ key: 2, value: '那么' })
  const data = await dict.findAll()
  console.log(data)
  ctx.body = data
});
/**用户注册 */
router.post('/register', async (ctx) => {
  const { request: { body: { phone = null, password = null, ...args } = {} } = {} } = ctx

  const users = await user.create({ phone, password, ...args })
  console.log(users)

  ctx.body = users
});
//获取字典
router.get('/dict', async (ctx) => {
  ctx.body = await '验证码'
});
//修改字典
router.get('/dict', async (ctx) => {
  ctx.body = await '验证码'
});

module.exports = router;
