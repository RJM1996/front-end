const fs = require("fs");
const path = require("path");
const mysql = require("mysql2/promise");
const moment = require('moment')

// 保存图片到 static/upload
function saveImg(img, imgName) {
  try {
    const readStream = fs.createReadStream(img.path);
    const uploadPath = path.resolve(__dirname, "./static/upload", imgName);
    const writeStream = fs.createWriteStream(uploadPath);
    readStream.pipe(writeStream);
    return 1;
  } catch (error) {
    console.log(error)
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
  const { name, url } = opts;
  const date = moment().format('YYYY-MM-DD HH:mm:ss')
  const sql = `INSERT INTO photos (id,name,url,create_time) VALUES (0,?,?,?)`;
  const [rows] = await mysqler.execute(sql, [name, url, date]);
  
  if (rows.affectedRows) {
    return 1;
  } else {
    return -1;
  }
}
// 获取所有图片
async function getAllImg(mysqler) {
  const sql = `SELECT * FROM photos`;
  const [rows] = await mysqler.execute(sql);
  if (rows) {
    return rows;
  } else {
    return -1;
  }
}

module.exports = {
  saveImg,
  connectDatabase,
  saveImgToDatabase,
  getAllImg
};
