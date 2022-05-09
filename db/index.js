const mongoose = require("mongoose");
var http = require('http');
var app = require('../app');
const { urlDb, urlAtlasDb } = require("../config");
const port = process.env.PORT

/**
 * Create HTTP server.
 */

const server = http.createServer(app).listen(port, () => {
    console.log(`Server started at port http://localhost:${port}`)
})

async function mongooseConnect() {
    const uri = urlAtlasDb
    mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
        console.log("Mongoose connected");
    });
}

module.exports = {
    mongooseConnect
}
