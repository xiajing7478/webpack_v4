const path = require('path')
const express = require('express')
const app = express()
const session = require('express-session')
const bodyParse = require('body-parser')
const ejs = require('ejs').__express

// 设置模板目录
app.set('views', __dirname);
// 设置模板引擎为 html
app.set('view engine', 'html');
// 使用ejs模板引擎解析html文件中ejs语法
app.engine('html', ejs);

// 使用 body-parser中间件 json形式
app.use(bodyParse.json());
// 解析UTF-8编码的数据，返回一个处理urlencoded数据的中间件
app.use(bodyParse.urlencoded({ extended: true }));
// 使用session中间件 设置cookie相关的信息
// 设置session时长为1分钟
app.use(session({
    secret: 'test',
    cookie: {
        maxAge: 1000 * 60 * 1
    }
}));

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'))
})

app.post('/login', (req, res) => {
    const body = req.body
    if (body.username == 'admin' && body.password == '123') {
        req.session.username = body.username
        res.redirect('/')
    } else {
        res.json({
            'code': 1,
            'errorMsg': '账户或密码错误'
        })
    }
})

app.get('/', (req, res) => {
    if (req.session.username) {
        res.render('home', { username: req.session.username });
    } else {
        res.redirect('login');
    }
})

app.use('/logout', (req, res) => {
    req.session.username = null
    res.redirect('/login')
})

const port = process.env.port || 3004;
app.listen(port, () => {
    console.log('http://127.0.0.1:%s', port)
});