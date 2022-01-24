const express = require("express");
const app = express();
const mongoose = require("mongoose");

const User = require("./models/User");
const userRoutes = require("./routes/user");

const saucesRoutes = require('./routes/sauces');
const path = require("path");
const likeRoutes = require('./routes/like');

// index.js
require('dotenv').config()




mongoose

 /* .connect(
    "mongodb+srv://Guillaume:10@test.munwb.mongodb.net/test?retryWrites=true&w=majority"
  )*/

  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@test.munwb.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(express.json());

app.use('/images', express.static(path.join(__dirname, "images")));

app.use("/api/auth", userRoutes);
app.use("/api/sauces", saucesRoutes);
app.use('/api/sauces', likeRoutes);


module.exports = app;
