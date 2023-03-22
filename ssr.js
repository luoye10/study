const http = require('http');
const fs = require('fs');
http.createServer(function (request, response) {
    let url = request.url;
    response.setHeader('Content-type', 'text/html;charset=UTF-8');
    if (url === '/') {
        response.end(`
        <html>
        <head>
          <title>hello</title>
        </head>
        <body>
          <h1 style="color: aqua; font-size: 25px;">hello</h1>
          <p>world</p>
          <button class="add">添加</button>
          <script src="./index.js"></script>
        </body>
      </html>
        `);
        return;
    }
    if (url === '/index.js') {
        response.setHeader('Content-type', 'text/x-javascript;charset=utf-8');
        fs.readFile('.' + url, (err, str) => {
            response.end(str);
        });
        return;
    }
    response.end('end');
}).listen(2233);
