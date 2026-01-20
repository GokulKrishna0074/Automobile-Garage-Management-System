const serviceRoutes = require("./routes/serviceRoutes");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/services", serviceRoutes);

mongoose.connect("mongodb://127.0.0.1:27017/garageDB")
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

app.get("/", (req, res) => {
  res.send("Garage Management Backend Running");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
