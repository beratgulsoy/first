 const http = require('http');
 const fs = require('fs');



const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;
    if(url === '/'){
        res.setHeader('Contont-Type', 'text/html');
        res.write('<html><head><meta charset="UTF-8"/><title>Enter Message</title></head><body><form action="/message" method="POST"><input type="text" name="msg"><button onclick="submit">Gönder</button></form></body></html>');
        return res.end();
    }
    if(url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', (chunk)=>{
            console.log(chunk);
            body.push(chunk);
        });
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString()
            const message = parsedBody.split('=')[1];
            fs.writeFileSync('message.txt', message);
        });
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end;
    }
    res.setHeader('Content-Type', 'text/html');
    res.write('<html><head><meta chatset="UTF-8"/><title>Main Page</title></head><body><h1>Hello!</h1></body></html>');
    res.end();
});

server.listen(3000);