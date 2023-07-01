const { Router } = require('express');
const { check } = require('express-validator');
const { getUsers, storeUser } = require('../controllers/users.js');
const { validFields } = require('../middlewares/valid-fields.js'); 

const router = Router();

// Users
router.get('/', getUsers);
router.post('/',
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'La contraseña es obligatoria').not().isEmpty(),
        check('email', 'El correo es obligatorio').isEmail(),
        validFields,
    ]
    , storeUser);

module.exports = router;