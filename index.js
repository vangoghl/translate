const express = require("express");
const bodyParser = require("body-parser");
const md5 = require("md5");
const app = express();
const request = require("request");
app.use(bodyParser.json());
const port = 4000;

// 配置静态文件目录
app.use(express.static("static"));

const sendHtml = (path, response) => {
  var fs = require("fs");
  var options = {
    encoding: "utf-8"
  };
  path = "template/" + path;
  fs.readFile(path, options, function(err, data) {
    console.log(`读取的html文件 ${path} 内容是`, data);
    response.send(data);
  });
};

const baiduTranslate = (data, res) => {
  let { q, from, to } = data;
  const appid = "20190305000273827";
  const salt = "hello233";
  const key = "I3tTuR3OtgmOjKzehLb4";
  const baseUrl = "http://api.fanyi.baidu.com/api/trans/vip/translate";
  // appid + q + salt + 密钥
  let sign = md5(appid + q + salt + key);
  // 比较笨的写法， 可以考虑把这里改成函数
  const url = `${baseUrl}?q=${q}&from=${from}&to=${to}&appid=${appid}&salt=${salt}&sign=${sign}`;
  request(url, (error, response, body) => {
    console.log("body", body);
    res.send(body);
  });
};

app.get("/", (req, res) => {
  sendHtml("index.html", res);
});

app.post("/translate/", (req, res) => {
  console.log("body", req.body);
  let body = req.body || {};
  baiduTranslate(body, res);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
