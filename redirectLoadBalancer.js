const http = require('http');

const servers = [];
let current = 0;
let serverCount = 5;

for (let i = 1; i <= serverCount; i++) {
    servers.push(`http://localhost:300${i}`);
}

const server = http.createServer((req, res) => {
    const target = servers[current];
    current = (current + 1) % servers.length;

    // 리다이렉트 응답 (302 Found)
    res.writeHead(302, {
        'Location': target + req.url
    });
    res.end();
});

server.listen(3000, () => {
    console.log('Redirect-based Load Balancer running on port 3000');
});
