const fs = require("fs");
const path = require("path");
const mysql = require("mysql2/promise");
const moment = require("moment");

// 保存图片到 static/upload
function saveImg(img, imgName) {
  try {
    const readStream = fs.createReadStream(img.path);
    const uploadPath = path.resolve(__dirname, "./static/upload", imgName);
    const writeStream = fs.createWriteStream(uploadPath);
    readStream.pipe(writeStream);
    return 1;
  } catch (error) {
    return -1;
  }
}

// 连接数据库
async function connectDatabase() {
  const mysqler = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "work",
  });
  return mysqler;
}
// 保存图片信息到数据库
async function saveImgToDatabase(opts, mysqler) {
  const { name, url, uid } = opts;
  const date = moment().format("YYYY-MM-DD HH:mm:ss");
  const sql = `INSERT INTO photos (id,uid,name,url,create_time) VALUES (0,?,?,?,?)`;
  const [rows] = await mysqler.execute(sql, [uid, name, url, date]);

  if (rows.affectedRows) {
    return 1;
  } else {
    return -1;
  }
}
// 获取所有图片
async function getAllImg(mysqler, uid) {
  const sql = `SELECT * FROM photos WHERE uid = ${uid}`;
  console.log(sql)
  const [rows] = await mysqler.execute(sql);
  if (rows) {
    return rows;
  } else {
    return -1;
  }
}
// 获取用户名
async function getUserName(mysqler, uid) {
  const sql = `SELECT username FROM users WHERE id = ${uid}`;
  const [rows] = await mysqler.execute(sql);
  if (rows) {
    return rows[0].username;
  } else {
    return -1;
  }
}


// 校验登录信息
async function checkLoginInfo(opts, mysqler) {
  const { username, password } = opts;
  const sql = `SELECT id FROM users WHERE username = '${username}' AND password = '${password}'`;
  const [rows] = await mysqler.execute(sql);
  if (rows.length) {
    const uid = rows[0].id;
    return uid;
  } else {
    return false;
  }
}

module.exports = {
  saveImg,
  connectDatabase,
  saveImgToDatabase,
  getAllImg,
  checkLoginInfo,
  getUserName
};
