const express = require("express");
const app = express();
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');

//. アプリケーションサーバーの稼働ポート番号
var port = process.env.PORT || 3000

// TODO 多分ハッシュ化とかした方がいいのでする。
//. 任意のシークレット文字列を登録
app.set('superSecret', 'welovenodejs');  //. 任意の文字列

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var users = [
    { name: 'black', exist: false },
    { name: 'white',  exist: false }
];

//. ドキュメントルートへの GET は許可
app.get('/', function (req, res) {
    res.send('Hello. The API is at http://localhost:' + port + '/api');
});

var apiRoutes = express.Router();

//. POST(http://localhost:3000/api/authenticate)
// apiRoutes.post('/authenticate', function (req, res) {
app.post('/api/authenticate', function (req, res) {
    for (var i = 0; i < users.length; i++) {
        if (users[i].exist === false) {
            //. 認証したユーザーの情報を使ってトークンを生成
            var token = jwt.sign(users[i], app.get('superSecret'), {
                expiresIn: '2h'
            });
            res.json({ success: true, message: 'Authentication successfully finished.', token: token });
            // TODO falseに戻す方法考える。TimeStamp？？
            users[i].exist = true
            return;
        }
    }
    res.json({ success: false, message: 'Authentication failed.' });
    return;
});



//. 認証フィルタ
apiRoutes.use(function (req, res, next) {
    //. ポスト本体、URLパラメータ、HTTPヘッダいずれかにトークンがセットされているか調べる
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (!token) {
        //. トークンが設定されていなかった場合は無条件に 403 エラー
        return res.status(403).send({ success: false, message: 'No token provided.' });
    }

    //. 設定されていたトークンの値の正当性を確認
    jwt.verify(token, app.get('superSecret'), function (err, decoded) {
        if (err) {
            //. 正当な値ではなかった場合はエラーメッセージを返す
            return res.json({ success: false, message: 'Invalid token.' });
        }

        //. 正当な値が設定されていた場合は処理を続ける
        req.decoded = decoded;
        next();
    });
});

//. 以下はトークンがないと使えない API

//. GET(http://localhost:8080/api/)
apiRoutes.get('/', function (req, res) {
    res.json({ message: 'Welcome to API routing.' });
});

//. GET(http://localhost:8080/api/users)
apiRoutes.get('/users', function (req, res) {
    res.json(users);
});

//. /api 以下に API をルーティング
app.use('/api', apiRoutes);


app.listen(port);
console.log('server started http://localhost:' + port + '/');

// app.get("/hello", function (req, res) {
//     res.json({aa:"World"});
// });

module.exports = {
    path: "/api/",
    handler: app
};