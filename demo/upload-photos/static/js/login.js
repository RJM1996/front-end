(function login() {
  const login = document.querySelector("#login");
  login.addEventListener("click", () => {
    const username = document.login.username.value;
    const password = document.login.password.value;
    const opts = {
      username,
      password,
    };
    console.log(opts);
    loginRequest(opts);
  });
})();

function loginRequest(opts) {
  const xhr = new XMLHttpRequest();
  xhr.open("post", "/login");
  let formData = new FormData();
  for (let key in opts) {
    formData.append(key, opts[key]);
  }
  xhr.send(formData);
  xhr.onload = () => {
    const res = JSON.parse(xhr.response);
    if (+res.code === 200) {
      saveToken(res.data);
      jumpToHomePage();
    } else {
      alert('账号或密码错误')
    }
  };
}

function jumpToHomePage() {
  window.location.href = "/photo.html";
}

function saveToken(data) {
  console.log(data);
  localStorage.setItem("token", data.token);
}
