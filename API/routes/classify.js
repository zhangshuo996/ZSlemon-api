var express = require('express');
var router = express.Router();

var classify_api = require("./classify_api")
router.get('/api/getCustom',classify_api.getCustom);
router.post('/api/addCustom',classify_api.addCustom);
router.post('/api/findClassify',classify_api.findClassify);

module.exports = router;