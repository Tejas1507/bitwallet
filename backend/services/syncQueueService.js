let syncQueue = [];

const addSyncItem = (item) => {
  syncQueue.push(item);
};

const processSyncQueue = async () => {
  while (syncQueue.length > 0) {
    const item = syncQueue.shift();
    try {
      await item.syncFunction(item.address);
    } catch (error) {
      console.error(`Failed to sync ${item.address}: ${error.message}`);
      // Retry logic could be added here
    }
    await new Promise((resolve) => setTimeout(resolve, 200)); // 0.2 second delay
  }
};

const getQueueStatus = () => {
  return syncQueue.length > 0 ? 'Syncing' : 'Synced';
};

module.exports = { addSyncItem, processSyncQueue, getQueueStatus };
