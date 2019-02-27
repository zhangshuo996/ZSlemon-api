var express = require('express');
var router = express.Router();
var userAPI = require("./user")
/* GET users listing. */
router.get('/',userAPI.findUser);
router.post('/addUser',userAPI.addUser);

module.exports = router;
