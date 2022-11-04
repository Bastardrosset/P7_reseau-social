const express = require('express');
const cookieParser = require('cookie-parser');

// Chemin vers les routes user et routes post
const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes');


require('dotenv').config({ path: './config/.env' });
require('./config/db');

const app = express();
const path = require('path');
const mongoSanitize = require("express-mongo-sanitize");


// appelle au middleware de vérification utilisateur
const { checkUser, requireAuth } = require('./middelware/auth.middelware');


// Headers & autorizations
const cors = require('cors');

// module morgan pour le suivi des requêtes
const morgan = require("morgan");

const corsOptions = {
  // on détermine la source qui est autorisé à faire des requêtes
  origin: process.env.CLIENT_URL,
  credentials: true,
  allowedHeaders: ['sessionId', 'Content-Type'],
  exposedHeaders: ['sessionId'],
  methods: 'GET,PUT,PATCH,POST,DELETE',
  preflightContinue: false
};
app.use(cors(corsOptions));

// Middelware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(cookieParser());

// configuration express-mongo-sanitze
app.use(
  mongoSanitize({
      allowDots: true,
      replaceWith: "_",
  })
);


// autorisation utilisateur connecté ("jwt") avant toutes les routes
app.get('*', checkUser);

// route pour vérifier le token utilisateur lors de l'authentication coté front
app.get('/jwtid', requireAuth, (req, res) => {
  res.status(200).send(res.locals.user._id);
});

// gestionnaire de routage des images
app.use('/images', express.static(path.join(__dirname, 'images')));


// Routes
app.use('/api/auth', userRoutes);
app.use('/api/post', postRoutes);

module.exports = app;