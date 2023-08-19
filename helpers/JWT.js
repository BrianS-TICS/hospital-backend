const jwt = require('jsonwebtoken');

const generateJWT = (uid, name, role) => {

    return new Promise((resolve, reject) => {

        const payload = {
            uid,
            name,
            role
        }

        jwt.sign(payload, process.env.JWT_SECRET_WORD, {
            expiresIn: '24h'
        }, (err, token) => {

            if (err) {
                reject("No se ha podido general el JWT");
            } else {
                resolve(token);
            }

        });

    })

}

const validateJWT = (token) => {

    return new Promise((resolve, reject) => {

        jwt.verify(token, process.env.JWT_SECRET_WORD, {}, (err, token) => {
            if (err) {
                reject("Token inválido")
            } else {
                resolve(token)
            }
        });

    })
}

module.exports = {
    generateJWT,
    validateJWT
}
