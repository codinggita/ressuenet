require('dotenv').config();

const app = require('./app');
const connectDatabase = require('./config/database');
const { scheduleMaintenanceJobs } = require('./utils/scheduler');

const PORT = Number(process.env.PORT) || 5000;

async function startServer() {
  await connectDatabase();
  scheduleMaintenanceJobs();

  app.listen(PORT, () => {
    console.log(`RescueNet backend listening on port ${PORT}`);
  });
}

startServer().catch((error) => {
  console.error('Failed to start server:', error.message);
  process.exit(1);
});
