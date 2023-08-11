const { Router } = require('express');
const { check } = require('express-validator');
const { getUsers, storeUser, updateUser, deleteUser } = require('../controllers/users.js');
const { validFields } = require('../middlewares/valid-fields.js');
const { validJWTSession } = require('../middlewares/valid-JWT-session.js');

const router = Router();

// Users
router.get('/', validJWTSession, getUsers);

router.post('/',
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'La contraseña es obligatoria').not().isEmpty(),
        check('email', 'El correo es obligatorio').isEmail(),
        validFields,
    ]
    , storeUser);

router.put('/:id',
    [
        validJWTSession,
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El correo es obligatorio').isEmail(),
        check('role', 'El rol es obligatorio').not().isEmpty(),
        validFields,
    ]
    , updateUser);

router.delete('/:id', validJWTSession, deleteUser);

module.exports = router;