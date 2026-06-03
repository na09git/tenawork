require('dotenv').config();
const app = require('./app');
const { connectDB } = require('./shared/database/db');
const logger = require('./shared/utils/logger');

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
    });
  } catch (err) {
    logger.error('Failed to start server:', err);
    process.exit(1);
  }
}

start();
