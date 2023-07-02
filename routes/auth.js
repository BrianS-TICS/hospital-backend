// Path: "/api/login"

const { Router } = require('express');
const { check } = require('express-validator');
const { validFields } = require('../middlewares/valid-fields.js');
const { login } = require('../controllers/auth');

const router = Router();

router.post('/', [
    check('email', 'El email es requerido').isEmail(),
    check('password', 'La contraseña es requerida').notEmpty(),
    validFields
], login);


module.exports = router
