// app.js

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const walletRoutes = require('./routes/walletRoutes');
const syncRoutes = require('./routes/syncRoutes');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/wallets', walletRoutes);
app.use('/api/sync', syncRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
