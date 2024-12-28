const mongoose = require("mongoose");

const trendsSchema = new mongoose.Schema({
  uniqueId: { type: String, required: true },
  trends: { type: [String], required: true },
  dateTime: { type: Date, required: true },
  ipAddress: { type: String, required: true },
});

module.exports = mongoose.model("Trend", trendsSchema);
