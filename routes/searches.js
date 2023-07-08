// Path: "/api/search"

const { Router } = require('express');
const { validJWTSession } = require('../middlewares/valid-JWT-session');
const { getAll, getDocumentsCollection } = require('../controllers/searches');

const router = Router();

router.get('/:search', validJWTSession, getAll);
router.get('/collections/:table/:search', validJWTSession, getDocumentsCollection);




module.exports = router;