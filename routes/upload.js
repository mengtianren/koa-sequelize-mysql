/**上传相关 */
var router = require('koa-router')();

router.prefix('/api/upload');


/** 上传文件 */
router.post('/', async (ctx) => {
    const { newFilename = '' } = ctx.request.files.files;
    ctx.success(`/public/${newFilename}`, '上传成功')
});

module.exports = router;
