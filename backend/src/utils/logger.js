function logInfo(message, meta = {}) {
  console.log(`[info] ${message}`, meta);
}

function logError(message, meta = {}) {
  console.error(`[error] ${message}`, meta);
}

module.exports = { logInfo, logError };
