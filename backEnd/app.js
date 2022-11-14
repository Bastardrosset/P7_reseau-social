const express = require('express');

// Chemin vers les routes user et routes post
const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes');
const auth = require('./middelware/auth.middelware')
require('dotenv').config({ path: './config/.env' });
require('./config/db');

const app = express();
const path = require('path');
const mongoSanitize = require("express-mongo-sanitize");
const bodyParser = require("body-parser");

// appelle au middleware de vérification utilisateur
// const { checkUser, requireAuth } = require('./middelware/auth.middelware');


// Headers & autorizations
const cors = require('cors');

// module morgan pour le suivi des requêtes
const morgan = require("morgan");

const corsOptions ={
  origin:'http://localhost:3000', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}
app.use(cors(corsOptions));

// Middelware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

// configuration express-mongo-sanitze
app.use(
  mongoSanitize({
      allowDots: true,
      replaceWith: "_",
  })
);
app.use(bodyParser.json());

// autorisation utilisateur connecté ("jwt") avant toutes les routes
// app.get("*", checkUser);

// gestionnaire de routage des images
app.use('/images', express.static(path.join(__dirname, 'images')));

// Routes
app.use('/api/auth', userRoutes);
app.use('/api/posts', postRoutes);

module.exports = app;