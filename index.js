const express = require('express');
const path = require('path');
require('dotenv').config();

//App de express
const app = express();

const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');

const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));

server.listen(process.env.PORT, (err) => {
    if (err) throw new Error(console.log(err));

    console.log('Servidor corriendo en puerto', process.env.PORT);
});