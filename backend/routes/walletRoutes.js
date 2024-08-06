const express = require('express');
const { importWallet, listWallets, getBalanceForAddress } = require('../controllers/walletController');
const router = express.Router();

router.post('/import', importWallet);
router.get('/list', listWallets);
router.get('/balance', getBalanceForAddress); // This should be correct

module.exports = router;
