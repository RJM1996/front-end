// 前端逻辑
const socket = io("ws://localhost:3000");

// send
// message -> chatMessage
// socket.emit("chatMessage","client")

// 1. 获取到点击的按钮
const sendBtn = document.querySelector("#sendBtn");
const msgInput = document.querySelector("#msg");

const urlSearchParams = new URLSearchParams(location.search);
const username = urlSearchParams.get("username");
const roomname = urlSearchParams.get("room");

const room = document.querySelector("#room-name");
room.innerText = roomname;

const users = document.querySelector('#users')
const user = document.createElement("li");
user.innerText = username
users.appendChild(user)

// 登录
socket.emit("joinChatRoom", {
  username,
});

sendBtn.onclick = () => {
  console.log(msgInput.value);
  // 把值发送给后端
  socket.emit("chatMessage", msgInput.value);
  msgInput.value = "";
  return false;
};

socket.on("message", (data) => {
  // div
  // 渲染data
  const { msg, username, time } = data;
  const messageDiv = document.createElement("div");

  messageDiv.classList.add("message");
  messageDiv.innerHTML = `
  <div>
    <p class="meta">
      ${username}
      <span>${time}</span>
    </p> 
  </div>
  <p>${msg}</p>`;

  const container = document.querySelector(".chat-messages");
  container.appendChild(messageDiv);
});
