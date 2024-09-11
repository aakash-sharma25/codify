const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const { connectDB } = require("./config/db");
require("dotenv").config();

const PORT = process.env.PORT || 8000;

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/v1/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(PORT, () => {
  console.log(`Server is running`);
});
