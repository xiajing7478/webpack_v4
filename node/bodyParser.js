const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.port || 5000

// 创建 application/json 解析
const jsonParser = bodyParser.json()

// 创建 application/x-www-form-urlencoded解析
const urlencodedParser = bodyParser.urlencoded({ extended: false })

app.get('/', (req, res) => {
    res.send('welcome, you');
    res.end();
})

app.post('/a', jsonParser, (req, res) => {
    if (!req.body) {
        return res.sendStatus(400);
    }
    res.send('welcome,' + req.body.userName);
    res.end();
})

app.listen(port, () => {
    console.log('http://127.0.0.1:%s', port)
})

//https://www.cnblogs.com/tugenhua0707/p/9904892.html
// http://interview.poetries.top/docs/base.html#%E5%A6%82%E4%BD%95%E4%B8%8Ehr%E8%B0%88%E8%96%AA%E8%B5%84
// https://bitable.feishu.cn/app8Ok6k9qafpMkgyRbfgxeEnet?from=logout&table=tblEnSV2PNAajtWE&view=vewJHSwJVd