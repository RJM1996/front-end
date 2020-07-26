const Koa = require("koa");

const Router = require("koa-router");

const moment = require("moment");

const koaBody = require("koa-body");

const cors = require("koa-cors");

const app = new Koa();

app.use(async (ctx, next) => {
  ctx.set("Access-Control-Allow-Origin", "*");
  ctx.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild"
  );
  ctx.set("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  if (ctx.method == "OPTIONS") {
    ctx.body = 200;
  } else {
    await next();
  }
});

app.use(
  koaBody({
    multipart: true,
  })
);

let logArr = [
  "warning_log: aaaaaaaaaaa-vvvvvvvvvvvv-ccccccccccccc-xxxxxxxxxxxxxxx",
  "warning_log: aaaaaaaaaaa-vvvvvvvvvvvv-ccccccccccccc-xxxxxxxxxxxxxxx",
  "warning_log: aaaaaaaaaaa-vvvvvvvvvvvv-ccccccccccccc-xxxxxxxxxxxxxxx",
  "warning_log: aaaaaaaaaaa-vvvvvvvvvvvv-ccccccccccccc-xxxxxxxxxxxxxxx",
  "warning_log: aaaaaaaaaaa-vvvvvvvvvvvv-ccccccccccccc-xxxxxxxxxxxxxxx",
];
const getlog = function () {
  const time = moment().format();
  logArr.push(
    time + " error_log: aaaaaaaaaaa-vvvvvvvvvvvv-ccccccccccccc-xxxxxxxxxxxxxxx"
  );
  return logArr;
};

const router = new Router();
let req = {
  status: 200,
  statusMsg: "OK",
  content: {
    fromLineNum: 1,
    toLineNum: 3,
    logContent: `2020-07-22 10:16:46 [com.xxl.job.core.thread.JobThread#run]-[125]-[Thread-24] <br>----------- xxl-job job execute start -----------<br>----------- Param:22\n
      2020-07-22 10:16:46 [com.xxl.job.core.thread.JobThread#run]-[159]-[Thread-24] <br>----------- xxl-job job execute end(finish) -----------<br>----------- ReturnT:ReturnT [code=200, msg=null, content=null]\n
      2020-07-22 10:16:46 [com.xxl.job.core.thread.TriggerCallbackThread#callbackLog]-[185]-[xxl-job, executor TriggerCallbackThread] <br>----------- xxl-job job callback finish.\n`,
    end: false, //是否结束
  },
};
for(let i=0; i<20; i++) {
  req.content.logContent += "2020-07-22 10:16:46 [com.xxl.job.core.thread.JobThread#run]-[125]-[Thread-24] <br>----------- xxl-job job execute start -----------<br>----------- Param:22\n"
}
let num = 1
router.post("/getlog", (ctx) => {
  num++
  if(num === 3) {
    req.content.end = true
  }
  ctx.body = req;
});
app.use(router.routes());

app.listen(3000, () => {
  console.log("open server localhost:3000");
});
