const express = require('express');
const {registerStartup,loginStartup,getStartups,getAllStartups} = require('../controllers/startupControllers');
const router = express.Router();
const {accessJwtToken} = require('../middleware/authMiddleware');

router.post('/register', registerStartup);
router.post('/login', loginStartup);
router.get('/', getStartups);
router.get('/allstartups', getAllStartups);


module.exports = router;