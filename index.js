const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const path = require("path")

require("dotenv").config();
// const c = require("./client/dist/index.html")

const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/admin.route");
const vendorRoutes = require("./routes/vendor.route");
const managerRoutes = require("./routes/manager.route");
const employeeRoutes = require("./routes/employee.route");
const { connectDB } = require("./config/db");

const PORT = process.env.PORT || 8000; 

const app = express();
 
app.use(
  cors({
    origin: "*", 
    credentials: true,
  })
);

app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: true, limit: "20kb" }));
app.use(cookieParser());

connectDB();

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/vendor", vendorRoutes);
app.use("/api/v1/manager", managerRoutes);
app.use("/api/v1/employee", employeeRoutes);

// app.get("/", (req, res) => {
//   res.send("Server is running");
// });

if(process.env.MODE==="development") {
  
  app.get("/", (req, res) => { 
    res.send("Server is running");
  });

}else{
  
  app.use(express.static(path.join(__dirname, "./client/dist")))
  
  app.get( "*" , (req,res) =>{
      res.sendFile(path.join(__dirname , "./client/dist/index.html"))
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
