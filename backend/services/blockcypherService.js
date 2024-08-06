// services/blockcypherService.js

const axios = require('axios');
const config = require('config');

const apiBaseUrl = config.get('blockcypher.apiBaseUrl');
const apiKey = process.env.BLOCKCYPHER_API_KEY;

const getBalance = async (address) => {
  try {
    const url = `${apiBaseUrl}/addrs/${address}/balance?token=49de76aed3b646ef9691d7d4e6ea7e59`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 429) {
      console.error('Rate limit exceeded. Try again later.');
    } else {
      console.error('Error fetching balance from BlockCypher:', error);
    }
    throw error;
  }
};

const getTransactions = async (txHash) => {
  try {
    const url = `${apiBaseUrl}/txs/${txHash}?token=49de76aed3b646ef9691d7d4e6ea7e59`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 429) {
      console.error('Rate limit exceeded. Try again later.');
    } else {
      console.error('Error fetching transaction from BlockCypher:', error);
    }
    throw error;
  }
};


module.exports = { getBalance, getTransactions };
