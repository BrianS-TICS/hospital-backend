const mongoose = require('mongoose');

const dbConnection = async () => {

    try {
        await mongoose.connect( process.env.DB_CONNECTION );
        console.log('db Online');
    } catch (error) {
        console.log(error);
        throw Error('Error a la hora de conectar la bd')
    }


}

module.exports = {
    dbConnection
}