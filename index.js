require('dotenv').config();

const express = require('express');
const cors = require('cors')

const { dbConnection } = require('./database/config.js')

// Make de server
const app = express();

// Configurar CORS
app.use( cors() )

// BD Connection
dbConnection();

// Routes
app.get('/', (req, res) => {

    res.status(400).json({
        okey: true,
        msg : "hola mundo"
    });

});

app.listen(process.env.PORT, () => {
    console.log('runing ' + process.env.PORT);
});