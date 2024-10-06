
// ability : Koa gives basic and extensible structure
import Koa from "koa"
const app = new Koa()

// ability : static file serving
import staticServe from "koa-static"
app.use(staticServe("static"))

// ability : dynamic file serving (EJS)
import render from "@koa/ejs"
import path from "path"
render(app, {
  root: path.join(import.meta.dirname, "view"),
  cache: false,
  layout: false, // "layout",
})

/*
// ability : handle generic requests ( unused raw, see routing below for use )
app.use(async ctx => {
  ctx.body = "Hello World from KoaJS app !\n"
  //await ctx.render("user")
})
*/

// ability : router for routing requests
import Router from "@koa/router"
const router = new Router()
router.get('/', async (ctx, next) => {
  // ctx.router available
  //ctx.body = "Hello World from KoaJS app !\n"
  await ctx.render("user", { username: "darcan" })
})
// ability : json web token ( jwt )
// https://chatgpt.com/c/6701811d-24a4-800a-acc6-f8bb055aef6c
import jwt from "koa-jwt"
import jsonwebtoken from "jsonwebtoken"
const secret = 'your-secret-key'
// Protect routes with JWT
app.use(jwt({ secret }).unless({ path: [/^\/login/] }))
// Route for login
router.get('/login', (ctx) => {
  const user = { id: 1, username: 'admin' }
  const token = jsonwebtoken.sign(user, secret)
  ctx.body = { token }
})
// Protected route
router.get('/protected', (ctx) => {
  ctx.body = 'Protected resource is now accessed!'
})
app.use(router.routes())

// ability : advice and explain
console.log("")
console.log("USE: node index.mjs &")
console.log("USE: nodemon index.mjs")
console.log("USE: curl http://localhost:8080")

// ability : listen for HTTP and/or HTTPS
app.listen(8080)
console.log("app running")
