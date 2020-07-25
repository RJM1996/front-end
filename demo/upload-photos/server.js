const Koa = require("koa");
const serve = require("koa-static");
const koaBody = require("koa-body");
const app = new Koa();
const router = require('./router')

app.use(
  koaBody({
    multipart: true,
  })
);
app.use(serve(__dirname + "/static"))
app.use(router.routes())

app.listen(8080, ()=>{
  console.log('already listening port 8080')
})
