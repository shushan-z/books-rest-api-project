const http = require('http');
const express = require('express');

const itemsRouter = require('./routes/books');

const app = express();
app.use(express.json());

app.use('/books', itemsRouter);

app.use('/', function (req, res) {
    res.send('Home page works :-)');
});

const server = http.createServer(app);
const port = 3000;
server.listen(port);

console.debug('Server listening on port ' + port);