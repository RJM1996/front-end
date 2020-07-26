const Router = require("koa-router");
const router = new Router();
const service = require("./service");
const jwt = require("jsonwebtoken");
const secret = "12l3k1j23l12kjdsafdmysslksj";
const koaJwt = require('koa-jwt')({secret});

let mysqler;
(async function () {
  mysqler = await service.connectDatabase();
})();


// 图片上传接口
router.post("/upload", koaJwt, async (ctx) => {
  const uid = ctx.state.user.uid

  const { img } = ctx.request.files;
  const result1 = service.saveImg(img, img.name);
  const opts = {
    name: img.name,
    url: "/upload/" + img.name,
    uid: uid,
  };
  const result2 = await service.saveImgToDatabase(opts, mysqler);
  if (result1 === 1 && result2 === 1) {
    ctx.body = {
      code: 200,
      msg: "success",
      data: "上传成功",
    };
  } else {
    ctx.body = {
      code: 400,
      msg: "failure",
      data: "上传失败",
    };
  }
});

// 图片获取接口
router.get("/getPhotos", koaJwt, async (ctx) => {
  const uid = ctx.state.user.uid
  const result = await service.getAllImg(mysqler, uid);
  const username = await service.getUserName(mysqler, uid);
  
  let res;
  if (result !== -1 && username !== -1) {
    let arr = [];
    result.forEach((element) => {
      const img = {
        id: element.id,
        name: element.name,
        url: element.url,
      };
      arr.push(img);
    });
    res = {
      code: 200,
      msg: "OK",
      data: {
        photos: arr,
        username: username,
      },
    };
  } else {
    res = {
      code: 400,
      msg: "failure",
      data: "获取图片失败",
    };
  }
  ctx.body = res;
});

router.post("/login", async (ctx) => {
  const opts = ctx.request.body;
  const uid = await service.checkLoginInfo(opts, mysqler);
  let res;
  if (uid) {
    const token = jwt.sign({ uid }, secret, {
      expiresIn: "2h",
    });
    res = {
      code: 200,
      msg: "login success",
      data: {
        token,
      },
    };
  } else {
    res = {
      code: 401,
      msg: "login fail",
      data: "用户名或密码不正确",
    };
  }

  ctx.body = res;
});

module.exports = router;

function checkTokenAngGetUid(ctx) {
  const token = ctx.get("authorization");
  console.log(token)
  let uid = -1;
  jwt.verify(token, secret, (err, decoded) => {
    console.log(err, decoded)
    if (err) {
      ctx.body = {
        state: 0,
        msg: "error",
        data: "获取数据失败",
      };
      return;
    }
    // 拿到decoded中的uid，根据uid查询该用户的数据并返回
    uid = decoded.uid;
  });
  return uid;
}
