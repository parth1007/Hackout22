const express = require('express');
const {registerStartup,loginStartup,getStartups} = require('../controllers/startupControllers');
const router = express.Router();
const {accessJwtToken} = require('../middleware/authMiddleware');

router.post('/register', registerStartup);
router.post('/login', loginStartup);
router.get('/', getStartups);


module.exports = router;