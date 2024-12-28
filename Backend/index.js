require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const trendsRoutes = require("./routes/trendsRoutes");
const bodyParser = require("body-parser");
const cors = require("cors");

connectDB();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/api", trendsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
