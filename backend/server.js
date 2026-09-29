const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const claimRoutes = require("./routes/claimRoutes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/claims", claimRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Student Bursary Claims API is running" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});