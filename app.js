var Koa = require("koa"),
  logger = require("koa-logger"),
  json = require("koa-json"),
  onerror = require("koa-onerror");
var jwt = require("koa-jwt");
const bodyparser = require("koa-bodyparser")
const koaStatic = require('koa-static')
const { koaBody } = require('koa-body')
const path = require("path")
const _ = require("lodash");
const appConfig = require("./config/appConfig.json");

var index = require("./routes/index");
var users = require("./routes/users");
var base = require("./routes/base");
var dict = require("./routes/dict");
var upload = require("./routes/upload");
var userproduct = require("./routes/userproduct");




var app = new Koa();
onerror(app);
/**文件上传 */
app.use(koaBody({
  multipart: true, formidable: {
    // 上传存放的路劲
    uploadDir: path.join(__dirname, './public/images'),
    // 保持后缀名\
    keepExtensions: true,
    onError(err) {
      console.log(err)
    }
  }
}));

/** 本地静态文件 */
app.use(koaStatic(__dirname + '/public'));

// 自定义 401 处理（如果您不想向用户公开 koa-jwt 错误）
app.use((ctx, next) => {
  ctx.success = (data, message = '操作成功') => {
    ctx.body = { code: 200, message, data }
  }
  ctx.error = (message = '系统错误', code = 500,) => {
    ctx.body = { code, message, data: {} }
  }
  return next().catch((err) => {
    console.log(err)
    if (err.status === 401) {
      ctx.error("暂无权限访问", 401,)
    } else {

      switch (err.name) {
        case "SequelizeDatabaseError":
          ctx.error("系统错误", 500)
          break;
        default:
          ctx.error(err.message, 500)
          break;
      }

      // throw err;
    }


  });
});
/** jwt校验 */
app.use(
  jwt({ secret: appConfig.appSecret }).unless({ path: [/^\/api\/base/, /^\/images/] })
);

/** 解析传送数据 */
app.use(bodyparser());
app.use(json()).use(logger());

app.use(async (ctx, next) => {
  ctx.set("Access-Control-Allow-Origin", "*");
  await next();
});



// routes definition
app.use(index.routes(), index.allowedMethods());
app.use(users.routes(), users.allowedMethods());
app.use(base.routes(), base.allowedMethods());
app.use(dict.routes(), dict.allowedMethods());
app.use(upload.routes(), upload.allowedMethods());
app.use(userproduct.routes(), userproduct.allowedMethods());

// error-handling
app.on("error", (err, ctx) => {
  console.error("server error", err, ctx);
});

module.exports = app;
