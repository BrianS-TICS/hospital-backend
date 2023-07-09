// ? Path api/upload

const { Router } = require('express');
const expressFileUpload = require('express-fileupload');

const { fileUpload } = require('../controllers/uploads');
const { validJWTSession } = require('../middlewares/valid-JWT-session');

const router = Router();

router.use(expressFileUpload());

router.post('/:type/:id', validJWTSession, fileUpload)


module.exports = router;