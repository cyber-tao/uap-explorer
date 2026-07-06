const http = require('http');
const fs = require('fs');
const path = require('path');
const port = 3456;
const dir = path.resolve('D:/WorkDir/global-uap-report/uap-explorer-website/dist');
const mime = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml'
};
http.createServer((req, res) => {
  let f = path.join(dir, req.url === '/' ? 'index.html' : req.url);
  try {
    const ext = path.extname(f);
    const c = fs.readFileSync(f);
    res.writeHead(200, {'Content-Type': mime[ext] || 'text/plain'});
    res.end(c);
  } catch(e) {
    res.writeHead(404);
    res.end('Not found');
  }
}).listen(port, () => console.log('Server on port ' + port));
