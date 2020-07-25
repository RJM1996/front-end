const Router = require("koa-router");
const router = new Router();
const service = require("./service");

let mysqler;
(async function () {
  mysqler = await service.connectDatabase();
})();

// 图片上传接口
router.post("/upload", async (ctx) => {
  const { img } = ctx.request.files;
  const result1 = service.saveImg(img, img.name);
  const opts = {
    name: img.name,
    url: "/upload/" + img.name,
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
router.get("/getPhotos", async (ctx) => {
  const result = await service.getAllImg(mysqler);
  if (result !== -1) {
    let arr = [];
    result.forEach((element) => {
      const img = {
        id: element.id,
        name: element.name,
        url: element.url,
      };
      arr.push(img);
    });
    ctx.body = arr;
  } else {
    ctx.body = {
      code: 400,
      msg: 'failure',
      data: '获取图片失败'
    }
  }
});

module.exports = router;
