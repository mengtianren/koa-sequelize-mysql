/**商品相关 */
const { userProduct, product, user } = require('../models');
const dayjs = require('dayjs');
const _ = require('lodash');
var router = require('koa-router')();

router.prefix('/api/product');

/** 修改房间介绍
 * 
 */
router.post('/detail', async (ctx) => {
    const { request: { body: { id, name, price, urls, address } }, state: { user: { isAdmin = '' } = {} } = {} } = ctx;
    if (!isAdmin || isAdmin === '0') {
        return ctx.error('当前用户非管理员')
    }
    if (!id) {
        return ctx.error('房间id不能为空')
    };
    const nameArgs = name ? { name } : {};
    const priceArgs = price ? { price } : {};
    const urlsArgs = urls ? { urls } : {};
    const addressArgs = address ? { address } : {}
    await product.update({
        ...nameArgs, ...priceArgs, ...urlsArgs, ...addressArgs
    }, { where: { id } })
    const data = await product.findOne({
        where: { id }
    })
    ctx.success(data, '修改成功')
})

/** 预订
 *  id: 商品id,
 * date:预订时间 如果没 则按照今天计算
 */
router.post('/', async (ctx) => {
    const { request: { body: { id, date = new Date() } = {} } = {}, state: { user: { id: uid = '' } = {} } = {} } = ctx;

    if (!id) {
        return ctx.error('请选择房间号')
    }
    const data_format = dayjs(date).format('YYYY-MM-DD')
    const isExist = await userProduct.findOne({
        where: { pid: id, date: data_format }
    });
    if (!_.isNull(isExist)) {
        ctx.error('房间已经被预订')
    } else {
        const data = await userProduct.create({
            pid: id, date: data_format, uid, type: '0'
        })
        const exist = await userProduct.findOne({
            where: { id: data.id },
            include: [
                {
                    association: userProduct.belongsTo(product, { foreignKey: 'pid', targetKey: 'id', }),
                    attributes: {
                        exclude: ['id']
                    }
                },
                {
                    association: userProduct.belongsTo(user, { foreignKey: 'uid', targetKey: 'id', }),
                    attributes: {
                        exclude: ['password']
                    }
                }
            ]
        })

        ctx.success(exist, '房间预订成功')
    }
});








module.exports = router;
