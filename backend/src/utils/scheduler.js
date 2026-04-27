const cron = require('node-cron');
const { logInfo } = require('./logger');

function scheduleMaintenanceJobs() {
  if (process.env.DISABLE_CRON === 'true') {
    return;
  }

  cron.schedule('0 */12 * * *', () => {
    logInfo('Scheduled maintenance heartbeat executed.');
  });
}

module.exports = { scheduleMaintenanceJobs };
