const { processSyncQueue, getQueueStatus } = require('../services/syncQueueService');

const syncWallets = async (req, res) => {
  processSyncQueue();
  res.json({ status: 'Syncing started' });
};

const getSyncStatus = async (req, res) => {
  const status = getQueueStatus();
  res.json({ status });
};

module.exports = { syncWallets, getSyncStatus };
