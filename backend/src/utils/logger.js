const fs = require("fs")
const path = require("path")

const logsDir = path.join(__dirname, "../logs")

// Create logs directory if it doesn't exist
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir)
}

const logActivity = (userId, action, details = {}) => {
  const timestamp = new Date().toISOString()
  const logEntry = {
    timestamp,
    userId,
    action,
    details,
    ipAddress: details.ipAddress || "unknown",
  }

  const logFile = path.join(logsDir, `activity-${new Date().toISOString().split("T")[0]}.log`)
  fs.appendFileSync(logFile, JSON.stringify(logEntry) + "\n")
}

module.exports = { logActivity }
