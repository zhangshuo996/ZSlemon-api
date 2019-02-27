var express = require('express');
var router = express.Router();

var bill_api = require("./bill_api")
router.get('/api/getbill',bill_api.getbill);
router.post('/api/addbill',bill_api.addbill);
router.post('/api/findbills',bill_api.findbills);
router.post('/api/removebill',bill_api.removebill);

module.exports = router;