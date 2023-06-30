const { Router } = require('express');
const { getUsers, storeUser  } = require('../controllers/users.js');

const router = Router();

// Routes
router.get('/', getUsers );
router.post('/', storeUser );

module.exports = router;