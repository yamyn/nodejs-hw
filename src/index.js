const http = require('http');
const events = require('./server/events');
const server = require('./server/server');

const port = server.get('port');

events.bind(http.createServer(server).listen(port), port);
