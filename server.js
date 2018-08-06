const http = require('http');
const fs = require('fs');

const messages = [];

http.createServer((req, res) => {
    if (req.url === '/')
        handleRoot(req, res);
    else if (req.url.startsWith('/messages'))
        handleMessagesRequest(req, res);
    else
        handleStatic(req, res);

}).listen(8080);

function handleRoot(req, res) {
    switch (req.method) {
        case 'GET':
            res.write(fs.readFileSync('./index.html'));
            res.end();
            break;
        case 'POST':
            let body = '';

            req.on('data', data => body += data);

            req.on('end', () => {
                console.log('Message: ' + body);
                messages.push(body);
                res.end();
            });
            break;
    }
}

function handleMessagesRequest(req, res) {
    const fromId = +req.url.split('?from=')[1];
    const requestedMessages = messages
        .slice(fromId)
        .map((message, index) => ({message, id: index + fromId}));
    res.write(JSON.stringify(requestedMessages));
    res.end();
}

function handleStatic(req, res) {
    if (req.url.endsWith('.svg'))
        res.writeHead(200, {'Content-Type': 'image/svg+xml'});
    else if (req.url.endsWith('.js'))
        res.writeHead(200, {'Content-Type': 'application/javascript'});
    else if (req.url.endsWith('.css'))
        res.writeHead(200, {'Content-Type': 'text/css'});
    res.end(fs.readFileSync('./' + req.url.slice(1)));
}
