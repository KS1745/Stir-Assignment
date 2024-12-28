const express = require("express");
const { getTrends } = require("../controllers/trendsController");
const router = express.Router();

router.get("/trends", getTrends);

module.exports = router;
