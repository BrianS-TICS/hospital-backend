// Path: "/api/login"

const { Router } = require('express');
const { check } = require('express-validator');
const { validFields } = require('../middlewares/valid-fields.js');
const { login, googleSignIn, renewToken } = require('../controllers/auth');
const { validJWTSession } = require('../middlewares/valid-JWT-session.js');

const router = Router();


router.post('/', [
    check('email', 'El email es requerido').isEmail(),
    check('password', 'La contraseña es requerida').notEmpty(),
    validFields
], login);

router.post('/google', [
    check('token', 'El token de google es requerido').notEmpty(),
    validFields
], googleSignIn);

router.get('/renew',
    validJWTSession,
    renewToken,
)



module.exports = router
