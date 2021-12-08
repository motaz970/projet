
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
app.use(cors());
const jsonParser = bodyParser.json();
const morgan = require("morgan");
const mongoose = require("mongoose");

const ChambreRoutes = require("./api/routes/chambre");

mongoose
  .connect(
    "mongodb+srv://minalu:minalu@cluster0.brysj.mongodb.net/minalu?retryWrites=true&w=majority"
  )
  .then(() => console.log("base connected"))
  .catch((err) => console.log(err));

app.use(morgan("dev"));
app.use("/chambre", jsonParser, ChambreRoutes);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});
module.exports = app;

