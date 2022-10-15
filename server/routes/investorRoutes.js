const express = require('express');
const {registerInvestor,loginInvestor,getInvestor} = require('../controllers/investorControllers');
const router = express.Router();
const {accessJwtToken} = require('../middleware/authMiddleware');

router.post('/register', registerInvestor);
router.post('/login', loginInvestor);
// router.get('/',accessJwtToken, getInvestor);


module.exports = router;