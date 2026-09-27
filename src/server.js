const http = require('http');
const query = require('querystring');
const responses = require('./responses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const handlePost = (request, response) => {
    const body = [];

    request.on('error', (err) => {
        console.dir(err);
        response.statusCode = 400;
        response.end();
    });

    request.on('data', (chunk) => {
        body.push(chunk);
    });

    request.on('end', () => {
        const bodyString = Buffer.concat(body).toString();
        const bodyParams = query.parse(bodyString);

        responses.addUser(request, response, bodyParams);
    });
};

const onRequest = (request, response) => {
    console.log(request.url);

    if (request.url === '/') {
        responses.getIndex(request, response);
    } else if (request.url === '/style.css') {
        responses.getCSS(request, response);
    } else if (request.url === '/getUsers') {
        if (request.method === 'HEAD') {
            responses.getUsersMeta(request, response);
        } else {
            responses.getUsers(request, response);
        }
    } else if (request.url === '/notReal') {
        if (request.method === 'HEAD') {
            responses.notFoundMeta(request, response);
        } else {
            responses.notFound(request, response);
        }
    } else if (request.url === '/addUser' && request.method === 'POST') {
        handlePost(request, response);
    } else {
        responses.notFound(request, response);
    }
};

http.createServer(onRequest).listen(port, () => {
    console.log(`Listening on 127.0.0.1:${port}`);
});