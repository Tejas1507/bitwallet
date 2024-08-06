const express = require('express');
const { syncWallets, getSyncStatus } = require('../controllers/syncController');
const router = express.Router();

router.post('/sync', syncWallets);
router.get('/status', getSyncStatus);

module.exports = router;
