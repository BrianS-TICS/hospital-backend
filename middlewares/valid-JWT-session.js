const { response } = require('express');
const jwt = require('jsonwebtoken');

const validJWTSession = (req, res = response, next) => {

    const token = req.header('token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: "No se ha proporcinado un token"
        })
    }

    try {

        const { uid } = jwt.verify(token, process.env.JWT_SECRET_WORD);

        req.uid = uid;

        next();

    } catch (error) {
        return res.status(404).json({
            ok: false,
            msg: "El token es inválido"
        })
    }

}

module.exports = {
    validJWTSession
}