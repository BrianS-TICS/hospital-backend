// Path: "/api/doctor"
const { Router } = require('express');
const { check } = require('express-validator');
const { getDoctors, storeDoctor, updateDoctor, deleteDoctor } = require('../controllers/doctors');
const { validFields } = require('../middlewares/valid-fields.js');
const { validJWTSession } = require('../middlewares/valid-JWT-session.js');

const router = Router();

// Hospital
router.get('/', validJWTSession, getDoctors);

router.post('/',
    [
        validJWTSession,
        check('name', 'El nombre es obligatorio').notEmpty(),
        check('hospital', 'El hospital es obligatorio').notEmpty(),
        validFields
    ]
    , storeDoctor);

router.put('/:id',
    [
        validJWTSession,
        check('name', 'El nombre es obligatorio').notEmpty(),
        check('hospital', 'El hospital es obligatorio').notEmpty(),
        validFields
    ], updateDoctor);

router.delete('/:id', validJWTSession, deleteDoctor);

module.exports = router;