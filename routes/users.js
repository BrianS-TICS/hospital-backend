const { Router } = require('express');
const { check } = require('express-validator');
const { getUsers, storeUser, updateUser } = require('../controllers/users.js');
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

router.put('/:id',
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El correo es obligatorio').isEmail(),
        check('role', 'El rol es obligatorio').not().isEmpty(),
        validFields,
    ]
    , updateUser);


module.exports = router;