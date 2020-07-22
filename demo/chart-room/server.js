// socket.io
const Koa = require("koa");
const http = require("http");
const serve = require("koa-static");
const moment = require('moment')
const users = require("./users");

const app = new Koa();
app.use(serve("./static"));

const server = http.createServer(app.callback());
const io = require("socket.io")(server);
let userNum = 0
io.on("connection", (socket) => {
  console.log('服务器已启动，当前在线人数：', ++userNum)

  socket.on("joinChatRoom", (data) => {
    // 存储了加入聊天的用户
    users.addUser(socket.id, data);

    //用户进来的时候
    // 当前用户收到  欢迎加入聊天室
    // 指定 room
    // socket.to(room)
    socket.emit("message", {
      username: "开课吧",
      msg: "欢迎加入聊天室",
      time: moment().format('LT'),
    });

    // 其他用户收到  xx 加入聊天室
    const { username } = data;
    // socket.to(room)
    socket.broadcast.emit("message", {
      username: "开课吧",
      msg: `${username} 加入聊天室`,
      time: moment().format('LT'),
    });
  });

  socket.on("disconnect", () => {
    // 通过 id
    const userInfo = users.findUser(socket.id);

    if (userInfo) {
      const { username } = userInfo;
      // 其他用户收到  xx 离开聊天室
      socket.broadcast.emit("message", {
        username: "开课吧",
        msg: `${username} 离开聊天室`,
        time: moment().format('LT'),
      });
    }
  });

  socket.on("chatMessage", (data) => {
    // 通过 id
    const userInfo = users.findUser(socket.id);

    if (userInfo) {
      const { username } = userInfo;
      console.log(username, data);
      // 通知所有的连接用户
      // 获取到用户名
      io.emit("message", {
        username,
        msg: data,
        time: moment().format('LT'),
      });
    }
  });
});

server.listen(3000, ()=>{
  console.log('already listening port 3000')
});
