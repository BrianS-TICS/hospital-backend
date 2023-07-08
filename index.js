require('dotenv').config();

const express = require('express');
const cors = require('cors')

const { dbConnection } = require('./database/config.js')

// Make de server
const app = express();

// Configurar CORS
app.use(cors())

// To read the body 
app.use( express.json() );

// BD Connection
dbConnection();

app.use('/api/users', require('./routes/users.js'))
app.use('/api/login', require('./routes/auth.js'))
app.use('/api/hospital', require('./routes/hospital.js'))
app.use('/api/doctor', require('./routes/doctor.js'))
app.use('/api/all', require('./routes/searches.js'))


app.listen(process.env.PORT, () => {
    console.log('runing ' + process.env.PORT);
});