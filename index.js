const Koa = require('koa');
const app = new Koa();

app.use(async ctx => {
  ctx.body = `
  <html>
  <head></head>
  <body>
    <h1>Main Heroku App</h1>
    <p>
      Your Dockhero example is deployed to ${process.env.DOCKHERO_HOST} -
      <a href="${process.env.DOCKHERO_FLEXIBLE_SSL_URL}">Visit it</a>
    </p>
  </body>
  </html>
  `
});

app.listen(process.env.PORT);
