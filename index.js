const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/admin.route");
const { connectDB } = require("./config/db");

const PORT = process.env.PORT || 8000;

const app=express()

app.use(cors({
    origin:"*",
    credentials:true
}))

app.use(express.json({limit:"20kb"})) 
app.use(express.urlencoded({extended:true,limit:"20kb"}))
app.use(cookieParser())

connectDB();

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
