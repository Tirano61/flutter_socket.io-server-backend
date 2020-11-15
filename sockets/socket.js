//Node server

const { io } = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');

const bands = new Bands();

bands.addBand(new Band('Queen'));
bands.addBand(new Band('Bon Jovi'));
bands.addBand(new Band('Metallica'))
bands.addBand(new Band('Guns n´ Roses'));
console.log(bands);

//Mensajes de sockets
io.on('connection', client => {
    console.log('Cliente Conectado');
    client.emit('active-bands', bands.getBands());

    client.on('disconnect', () => {
        console.log('Cliente desconectado');
    });

    client.on('mensaje', (payload) => {
        console.log('Mensaje', payload);
        io.emit('mensaje', { admin: 'Nuevo Mensaje' });
    });

    client.on('vote-band', function (payload) {
        bands.voteBand(payload.id);
        io.emit('active-bands', bands.getBands());
    });

    client.on('emitir-mensaje', (payload) => {
        client.broadcast.emit('emitir-mensaje', payload);
        console.log('Mensaje', payload);
    });

    client.on('new-band', (payload) => {
        bands.addBand(new Band(payload.band));
        io.emit('active-bands', bands.getBands());
    });

    client.on('delete-band', (payload) => {
        bands.deleteBand(payload.id);
        io.emit('active-bands', bands.getBands());
    });

});
