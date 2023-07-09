// ? Path api/upload

const { Router } = require('express');
const expressFileUpload = require('express-fileupload');

const { validJWTSession } = require('../middlewares/valid-JWT-session');
const { fileUpload, getImage } = require('../controllers/uploads');

const router = Router();

router.use(expressFileUpload());

router.post('/:type/:id',
    [
        validJWTSession
    ], fileUpload)


router.get('/:type/:image',
    [
        validJWTSession
    ], getImage)


module.exports = router;