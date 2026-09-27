const fs = require('fs');

const client = fs.readFileSync(`${__dirname}/../client/client.html`);

const css = fs.readFileSync(`${__dirname}/../client/style.css`);

const users = {};



const getIndex = (request, response) => {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(client);
    response.end();
};

const getCSS = (request, response) => {
    response.writeHead(200, { 'Content-Type': 'text/css' });
    response.write(css);
    response.end();
};

const notFound = (request, response) => {
    const responseJSON = {
        message: 'The page you are looking for was not found.',
        id: 'notFound',
    };

    response.writeHead(404, { 'Content-Type': 'application/json' });
    response.write(JSON.stringify(responseJSON));
    response.end();
};

const notFoundMeta = (request, response) => {
    response.writeHead(404, { 'Content-Type': 'application/json' });
    response.end();
};

const getUsers = (request, response) => {
    const responseJSON = {
        users,
    };

    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.write(JSON.stringify(responseJSON));
    response.end();
};

const getUsersMeta = (request, response) => {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end();
};

const addUser = (request, response, body) => {
    const responseJSON = {
        message: 'Name and age are both required.',
    };

    if (!body.name || !body.age) {
        responseJSON.id = 'missingParams';

        response.writeHead(400, { 'Content-Type': 'application/json' });
        response.write(JSON.stringify(responseJSON));
        response.end();
        return;
    }

    let responseCode = 201;

    if (users[body.name]) {
        responseCode = 204;
    } else {
        users[body.name] = {};
    }

    users[body.name].name = body.name;
    users[body.name].age = body.age;

    if (responseCode === 204) {
        response.writeHead(204);
        response.end();
        return;
    }

    responseJSON.message = 'Created Successfully';
    response.writeHead(201, { 'Content-Type': 'application/json' });
    response.write(JSON.stringify(responseJSON));
    response.end();
};

module.exports = {
    getIndex,
    getCSS,
    getUsers,
    getUsersMeta,
    notFound,
    notFoundMeta,
    addUser,
};