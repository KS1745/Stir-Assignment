const Trend = require("../models/trendsModel");
const fetchTrendingTopics = require("../services/seleniumService");
const { v4: uuidv4 } = require("uuid");

exports.getTrends = async (req, res) => {
  try {
    const { trends, dateTime, ipAddress } = await fetchTrendingTopics();
    res.status(200).json({ trends, dateTime, ipAddress });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch trends", details: error.message });
  }
};
