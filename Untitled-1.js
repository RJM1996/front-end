function count() {
    var arr = [];
    for (let i = 1; i <= 3; i++) {
        arr.push(function () {
            return i * i;
        });
    }
    // console.log(i);
    return arr;
}
// 在这里count的类型是function
console.log(typeof count);
console.log(count instanceof Number);
console.log(count instanceof Function);
console.log(count instanceof Array);
console.log(count instanceof Object);
var res = count();
console.log(res);
console.log(res[0]());
console.log(res[1]());
console.log(res[2]());

// 生成器 generator: 使用function*定义
// 除了return语句, 还可以用yield返回多次
// 举例: 生成斐波那契数列
function* fib(max) {
    var a = 0,
        b = 1,
        n = 0;
    while (n < max) {
        yield a;
        [a, b] = [b, a + b];
        n++;
    }
}
var foo = fib(5);
console.log(foo);
console.log(foo.next());

var url = 'https://api.openweathermap.org/data/2.5/forecast?q=Beijing,cn&appid=800f49846586c3ba6e7052cfc89af16c';
function WeatherInfo(data) {
    var info = {
        city: data.city.name,
        weather: data.list[0].weather[0].main,
        time: data.list[0].dt_txt
    };
    console.log(JSON.stringify(info, null, "  "));
}
// var data = $.getJSON(url, WeatherInfo);
// console.log(data);

// 浏览器对象: window
console.log("浏览器窗口大小(外宽高): " + window.outerWidth + "x" + window.outerHeight)
console.log("显示网页布局大小(内宽高): " + window.innerWidth + "x" + window.innerHeight)

// navigator 对象: 表示浏览器的信息
console.log('appName = ' + navigator.appName);
console.log('appVersion = ' + navigator.appVersion);
console.log('language = ' + navigator.language);
console.log('platform = ' + navigator.platform);
console.log('userAgent = ' + navigator.userAgent);

// screen对象: 表示屏幕信息
console.log('屏幕分辨率: ' + screen.width + ' x ' + screen.height);
console.log('屏幕颜色位数: ' + screen.colorDepth);

// location对象: 表示当前页面的URL信息
console.log("当前页面的URL: " + location.href);
// 获取URL各部分的值
function printUrlData(data) {
    console.log(data + '\n');
}
printUrlData(location.protocol);
printUrlData(location.host);
printUrlData(location.port);
printUrlData(location.pathname);

function testReload() {
    if (confirm("要重新加载当前页面吗?")) {
        // 重新加载当前页面
        location.reload();
    } else {
        var url = "http://www.apple.com.cn"
        // 加载一个新页面
        location.assign(url);
        console.log(location.href);
    }
}

// document对象: 表示当前页面, 是整个DOM树的根节点
console.log("页面标题: " + document.title);
document.title = "努力学习JavaScript";
console.log("页面标题: " + document.title);
// 根据 ID和Tag Name 查找DOM树的某个节点
var menu = document.getElementById('drink-menu');
console.log(menu);
var drinks = document.getElementsByTagName('dt');
console.log(drinks);
for (const iterator of drinks) {
    console.log(iterator.innerHTML);
}
// 获取当前页面的Cookie
console.log(document.cookie);

// 操作DOM: 因为HTML文档被浏览器解析后就是一棵DOM树, 要改变HTML的结构
// 就需要使用js来操作DOM树: 更新 遍历 添加 删除
// 获得DOM节点
// 根据id获得: 获取id为test的节点
var test = document.getElementById("test");
// 获取test节点下的所有直属子节点
// var cs = test.children;
// 获取test下的第一个, 最后一个子节点
// var first = test.firstElementChild;
// var last = test.lastElementChild;

// 使用querySelector() 获取ID为q1的节点
var q1 = document.querySelector("#q1");

// 选择<p>JavaScript</p>节点
var js = document.getElementById("test-p");
console.log(js.innerHTML);
// 选择<p>Python</p>,<p>Ruby</p>,<p>Swift</p>
var arr = document.getElementsByClassName("c-red c-green")[0].getElementsByTagName("p");
console.log(arr[0]);
arr = document.querySelectorAll(".c-red.c-green > p");
console.log(arr);
// 选择<p>Haskell</p>
var haskell = document.getElementsByClassName("c-green")[1].getElementsByTagName("p")[1];
console.log(haskell);
haskell = document.querySelectorAll(".c-green > p")[4];
console.log(haskell);

// 更新DOM
var p = document.getElementById("p-id");
// 使用innerHTML
p.innerHTML = 'Hello';
// 修改p节点内部结构
p.innerHTML = 'ABC <span style="color:red">RED</span> XYZ';
// 使用innerText和textContent属性,只能修改文本,不能设置HTML标签
p.innerText = '<script>alert("Hi")</script>';
p = document.getElementById("no-display");
console.log(p.innerText);
console.log(p.textContent);
// 修改DOM节点的style属性
p.style.display = "block";
p.innerText = "可见标签";
p.style.fontSize = "20px";

// 插入DOM
// 使用appendChild: 把一个子节点添加到父节点的最后一个子节点
var js = document.getElementById("js");
var list = document.getElementsByClassName("c-red")[0];
list.appendChild(js);
// 创建新节点, 插入到指定位置
var c = document.createElement("p");
c.id = "c";
c.innerText = "C语言";
list.appendChild(c);
// 使用insertBefore: 将子节点插入到指定位置
// parentElement.insertBefore(newElement, referenceElement);
// newElement会插入到referenceElement之前
var list = document.getElementById("list"),
    python = document.getElementById("python");
list.insertBefore(c, python);
// 循环一个父节点的所有子节点
for (let i = 0; i < list.children.length; i++) {
    var c = list.children[i];
    console.log(c.innerText);
}
// 按照字符串顺序,对DOM节点进行排序
var list = document.getElementById("test-list");
function sortList(list) {
    var length = list.children.length;
    for (let i = 0; i < length; i++) {
        for (let j = 0; j < length - i - 1; j++) {
            let cur = list.children[j];
            let next = list.children[j + 1];
            if (cur.innerText >= next.innerText) {
                list.insertBefore(next, cur);
            }
        }
    }
}
sortList(list);

// 删除DOM: 获取待删除节点和他的父节点, 调用父节点的removeChild删除自己
var self = document.getElementById("to-be-removed");
// 使用parentElement获取父节点
var parent = self.parentElement;
console.log(parent);
// 使用父节点的removeChild()删除自己
var removed = parent.removeChild(self);
console.log(self === removed);
// 删除不符合条件的节点
var list = document.getElementById("test-list01");
function deleteElement(list) {
    for (let i = list.children.length - 1; i >= 0; i--) {
        var text = list.children[i].innerText;
        // console.log(text);
        if (text !== "JavaScript"
            && text !== "HTML"
            && text !== "CSS") {
            // console.log(list.children[i]);
            list.removeChild(list.children[i]);
        }
    }
}
deleteElement(list);
// 操作表单
// 获取用户输入: 适用于text password hidden select
var input = document.getElementById('email');
console.log(input.value);
// 单选框和复选框, 需要使用checked判断
var Mon = document.getElementById("monday");
var Tue = document.getElementById("tuesday");
console.log(Mon);
console.log(Mon.value + " " + Tue.value);
// 如果Mon是被选中的状态,那么checked属性为true
Mon.checked = true;
console.log(Mon.checked);
// HTML5控件: date datetime datetime-local color
// 提交表单信息: 通过form表单的submit按钮提交一个表单
function doSubmitForm() {
    document.getElementById("test-form").submit();
}
// 响应form的onsubmit()事件
function checkForm() {
    var form = document.getElementById("test-form");
    var pwd = document.getElementById('password');
    pwd.value = md5(pwd.value);
    console.log(pwd.value);
    return true;
}
// 检查注册信息是否符合要求
function checkRegisterForm() {
    var username = document.getElementById("username01").value;
    var password = document.getElementById("password01").value;
    var password2 = document.getElementById("password-2").value;
    // 用户名必须是3-10位英文或数字
    // 密码必须6-20位
    // 两次输入密码必须一致
    const usernameReg = /^[0-9a-zA-Z]{3,10}$/;
    const passwordReg = /.{6,20}/;
    if (usernameReg.test(username)
        && passwordReg.test(password)
        && password === password2) {
        return true;
    } else {
        if (!usernameReg.test(username)) {
            alert("用户名必须是3-10位英文字母或数字!");
        } else if (!passwordReg.test(password)) {
            alert("口令必须是6-20位!")
        } else if (password !== password2) {
            alert("两次输入口令不一致!")
        }
    }
    return false;
}

// 操作文件: HTML5提供的File API
// 通过File和FileReader两个主要对象,可以获得文件信息并读取文件
var inputFile = document.getElementById("test-image-file"),
    fileInfo = document.getElementById("test-file-info"),
    preview = document.getElementById("test-image-preview");

inputFile.addEventListener('change', function () {
    // 清除背景图片
    preview.style.backgroundImage = "";
    // 检查是否选择文件
    if (!inputFile.value) {
        fileInfo.innerText("还没有选择文件!");
        return;
    }
    // 获取用户选择的文件File对象
    // 选择的文件保存在FileList对象中,只选了一个文件,那就是files[0]
    var file = inputFile.files[0];
    // 获取file信息,修改html内容,显示文件信息
    fileInfo.innerHTML = "文件名: " + file.name + "<br>" +
        "文件大小: " + file.size + "<br>" +
        "修改日期: " + file.lastModifiedDate + "<br>";
    if (file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/gif') {
        alert('不是有效的图片文件!');
        return;
    }
    // 创建FileReader对象, 读取文件
    var reader = new FileReader();
    // 当文件读取完成后, 自动调用此函数, 将图片的base64设置到backgroundImage属性中
    reader.onload = function (event) {
        var data = event.target.result;
        preview.style.backgroundImage = 'url(' + data + ')';
    };
    // 以DataURL的形式读取文件:
    reader.readAsDataURL(file);
})

// AJAX
// 1. 创建XMLHttpRequest对象
var request = new XMLHttpRequest();
// 2. 监听request的onreadystatechange事件
request.onreadystatechange = function () {
    // 当请求状态发生变化时, readyState 属性会发生变化, 该属性有0 1 2 3 4几个取值
    // 4代表响应完成, 已经接收到全部数据
    if (request.readyState === 4) {
        if ((request.status >= 200
            && request.status < 300)
            || request.status === 304) {
            alert("请求成功: " + request.responseText);
        } else {
            alert("请求失败: " + request.status);
        }
    }
}
request.open('get', 'http://localhost:8082/example.txt', true);
console.log(request.readyState);
request.send(null);
console.log(request.readyState);

