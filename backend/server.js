require("dotenv").config();

const express = require("express");
const userRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin");
const mongoose = require("mongoose");
const admin = require("./models/admin");

//express app
const app = express();

//middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.method , req.path);
  next();
});

//routes
app.use("/", userRoutes);
app.use("/admin",adminRoutes)

//connect to db
mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    //listen for requests
    app.listen(process.env.PORT, () =>
      console.log(`Connecting to db & listening on port ${process.env.PORT}`)
    );
  })
  .catch((err) => {
    console.log("Oh no mongo error!!!");
    console.log(err);
  });
