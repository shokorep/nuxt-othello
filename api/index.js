const express = require("express");
const app = express();
var bodyParser = require('body-parser');
// var jwt = require('jsonwebtoken');


//. アプリケーションサーバーの稼働ポート番号
// const port = process.env.PORT || 3000

// TODO 多分ハッシュ化とかした方がいいのでする。
//. 任意のシークレット文字列を登録
// app.set('superSecret', 'welovenodejs');  //. 任意の文字列

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true }))

app.use('/auth', require('./models/auth'));
// app.get('/board', board);
// app.put('/board', board);
app.use('/board', require('./models/board'))

module.exports = app;
// module.exports = apiRoutes;
// {
//     path: "/api",
//     handler: app
// };