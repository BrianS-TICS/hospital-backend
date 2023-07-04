// Path: "/api/hospital"
const { Router } = require('express');
const { check } = require('express-validator');
const { getHospitals, storeHospital, updateHospital, deleteHospital } = require('../controllers/hospitals');
const { validFields } = require('../middlewares/valid-fields.js');
const { validJWTSession } = require('../middlewares/valid-JWT-session.js');

const router = Router();

// Hospital
router.get('/', validJWTSession, getHospitals);

router.post('/',
    [
        validJWTSession,
        check('name', 'El nombre es obligatorio').notEmpty(),
        validFields
    ]
    , storeHospital);

router.put('/:id',
    [
        validJWTSession,
        check('name', 'El nombre es obligatorio').notEmpty(),
        validFields
    ], updateHospital);

router.delete('/:id', validJWTSession, deleteHospital);

module.exports = router;