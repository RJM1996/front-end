import KoaRouter from "koa-router";
import glob from "glob";
import MainController from "../controllers/main";

interface KKBOptions {
  // 设置控制器文件存在的目录
  controllersPath: string;
  // 路由对象
  router: KoaRouter;
}

export default class KKB {
  constructor(private options: KKBOptions) {
    // 根据options.controllersPath加载所有的controller文件
    this.loadControllers();
  }

  private loadControllers() {
    let controllerFiles = glob.sync(this.options.controllersPath);

    console.log("controllerFiles", controllerFiles);

    // 循环所有的controller文件，并加载，进行实例化，然后把实例化以后的方法与对应的路由（url）进行绑定
    controllerFiles.forEach((controllerFile) => {
      let Controller = require(controllerFile).default;

      let controller = new Controller();

      // controller.__controllers = [
      //     {
      //         verb: 'get',
      //         url: '/',
      //         name: 'index'
      //     },
      //     {
      //         verb: 'post',
      //         url: '/login',
      //         name: 'login'
      //     }
      // ];

      // controller.index;

      // if ( controller.index ) {
      //     this.options.router.get('/', controller.index);
      // }

      // 当前的控制器对象的哪些方法与哪些url进行绑定
      // console.log('controller', controller.__controllers);

      if (controller.__controllers) {
        controller.__controllers.forEach(
          (__controller: {
            verb: string | number;
            url: any;
            name: string | number;
          }) => {
            this.options.router[__controller.verb](
              __controller.url,
              controller[__controller.name]
            );
          }
        );
      }
    });
  }
}

export function Get(url: string) {
  return createAPIDecorator(url, "get");
}

export function Post(url: String) {
  return createAPIDecorator(url, "post");
}

// 生成api装饰器
function createAPIDecorator(url: String, methodName: String) {
  console.log(methodName);
  return function (target: any, name: string, descriptor: PropertyDescriptor) {
    if (!target.__controllers) {
      target.__controllers = [];
    }
    target.__controllers.push({
      verb: methodName,
      url,
      name,
    });
  };
}
