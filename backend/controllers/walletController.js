// controllers/walletController.js

const bip39 = require('bip39');
const bitcoin = require('bitcoinjs-lib');
const { getBalance } = require('../services/blockcypherService');
const { addSyncItem } = require('../services/syncQueueService');
const ecc = require('tiny-secp256k1');
const { BIP32Factory } = require('bip32');
const bip32 = BIP32Factory(ecc);

// In-memory storage for wallets
const wallets = [];

const importWallet = async (req, res) => {
  const { mnemonic, walletName } = req.body;

  console.log('Received mnemonic:', mnemonic);
  console.log('Received walletName:', walletName);

  if (!bip39.validateMnemonic(mnemonic)) {
    return res.status(400).json({ error: 'Invalid mnemonic phrase' });
  }

  const seed = bip39.mnemonicToSeedSync(mnemonic);
  const root = bip32.fromSeed(seed, bitcoin.networks.testnet);
  const account = root.derivePath("m/44'/1'/0'/0/0");
  const { address } = bitcoin.payments.p2pkh({ pubkey: account.publicKey, network: bitcoin.networks.testnet });

  console.log('Generated address:', address);

  let balance = 0;
  try {
    const balanceData = await getBalance(address);
    console.log('Fetched balance data:', balanceData); // Log balance data
    balance = balanceData.final_balance || 0; // Ensure we get the correct balance field
  } catch (error) {
    console.error('Error fetching balance:', error);
  }

  // Store the wallet with balance
  wallets.push({ walletName, address, balance });

  res.json({ walletName, address, balance });
};

const listWallets = async (req, res) => {
  console.log('Wallets:', wallets); // Log wallets array
  res.json(wallets);
};

// Endpoint to get balance by address
const getBalanceForAddress = async (req, res) => {
  const { address } = req.query;
  console.log('Received address:', address);

  if (!address) {
    return res.status(400).json({ error: 'Address is required' });
  }

  try {
    const balanceData = await getBalance(address);
    console.log('Balance data from BlockCypher:', balanceData); // Check this log
    res.json(balanceData);
  } catch (error) {
    console.error('Error fetching balance:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


module.exports = { importWallet, listWallets, getBalanceForAddress };
