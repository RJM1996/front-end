const Koa = require("koa");
const serve = require("koa-static");
const koaBody = require("koa-body");
const app = new Koa();
const router = require('./router')
const koaJwt = require("koa-jwt");
const secret = "12l3k1j23l12kjdsafdmysslksj";

app.use(serve(__dirname + "/static"))

app.use(
  koaJwt({
    secret,
  }).unless({
    path: [/^\/login/],
  })
);

app.use(
  koaBody({
    multipart: true,
  })
);

app.use(router.routes())

app.listen(8080, ()=>{
  console.log('already listening port 8080')
})
