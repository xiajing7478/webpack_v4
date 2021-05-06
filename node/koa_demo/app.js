const koa = require('koa');
const app = new koa();
app.use(async(ctx, next) => {
    console.log(ctx)
    await next()
    ctx.response.type = 'text/html'
    ctx.response.body = 'hello koa.......'
})

app.listen(3005)
console.log('app started at port 3001...')