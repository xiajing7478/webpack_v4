const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const app = express()
const port = process.env.port || 5000

// 创建 application/json 解析
// const jsonParser = bodyParser.json()

// 创建 application/x-www-form-urlencoded解析
// const urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())

app.get('/123', (req, res) => {
    res.cookie('user123', 'asdfghj123')
    res.send(req.cookies)
    res.send('welcome, you');
    res.end();
})

app.post('/a', (req, res) => {
    if (!req.body) {
        return res.sendStatus(400);
    }
    res.send('welcome,' + req.body.userName);
    res.end();
})

app.post('/common', function(req, res) {
    console.log('收到post请求了')
        //获取url中的请求参数
    var query = req.query
    console.log(query)
        //在Express中没有内置获取表单post请求的api，这里我们需要使用一个第三方包 body-parser
    var params = req.body
    console.log(params)
})

app.listen(port, () => {
    console.log('http://127.0.0.1:%s', port)
})

//https://www.cnblogs.com/tugenhua0707/p/9904892.html
// http://interview.poetries.top/docs/base.html#%E5%A6%82%E4%BD%95%E4%B8%8Ehr%E8%B0%88%E8%96%AA%E8%B5%84
// https://bitable.feishu.cn/app8Ok6k9qafpMkgyRbfgxeEnet?from=logout&table=tblEnSV2PNAajtWE&view=vewJHSwJVd