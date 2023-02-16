var Koa = require("koa"),
  logger = require("koa-logger"),
  json = require("koa-json"),
  onerror = require("koa-onerror");
var jwt = require("koa-jwt");
var index = require("./routes/index");
var users = require("./routes/users");
var base = require("./routes/base");
var dict = require("./routes/dict");
const _ = require("lodash");
const appConfig = require("./config/appConfig.json");
var app = new Koa();
// error handler
onerror(app);

// 自定义 401 处理（如果您不想向用户公开 koa-jwt 错误）
app.use((ctx, next) => {
  return next().catch((err) => {
    console.log(err.name, 999, err.statusCode, err.status)
    if (err.status === 401) {
      ctx.status = 401;
      ctx.body = "暂无权限访问";
    } else {
      console.log('error', '88888888888', err)
      ctx.status = 500;
      ctx.body = err.message
      // throw err;
    }
  });
});
/** jwt校验 */
app.use(
  jwt({ secret: appConfig.appSecret }).unless({ path: [/^\/api\/base/] })
);
/** 解析传送数据 */
app.use(require("koa-bodyparser")());
app.use(json()).use(logger());

app.use(async (ctx, next) => {
  ctx.set("Access-Control-Allow-Origin", "*");
  await next();
});

// app.use(async (ctx, next) => {
//   var start = new Date();
//   await next();
//   var ms = new Date() - start;
//   console.log("%s %s - %s", ctx.method, ctx.url, ctx.body, ms);
// });
/** 本地静态文件 */
// app.use(require('koa-static')(__dirname + '/public'));

// routes definition
app.use(index.routes(), index.allowedMethods());
app.use(users.routes(), users.allowedMethods());
app.use(base.routes(), base.allowedMethods());
app.use(dict.routes(), dict.allowedMethods());

// error-handling
app.on("error", (err, ctx) => {
  console.error("server error", err, ctx);
});

module.exports = app;
