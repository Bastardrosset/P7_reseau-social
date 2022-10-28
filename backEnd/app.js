const express = require('express');
require('dotenv').config({
  path: './config/.env'
});
require('./config/db');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const {
  checkUser,
  requireAuth
} = require('./middelware/auth.middelware'); // permet de controler le token

const cors = require('cors');
const app = express();
const path = require('path')

// Headers & autorizations
const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  'allowedHeaders': ['sessionId', 'Content-Type'],
  'exposedHeaders': ['sessionId'],
  'method': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
  'preflightContinue': 'false'
}
app.use(cors(corsOptions))

app.use('/images', express.static(path.join(__dirname, 'images')));

// Middelware
app.use(bodyParser.json()); // analyseur accepte tous encodages Unicode et met a disposition le body des requetes
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(cookieParser()); // analyseur permet de décoder les cookies

app.get('*', checkUser); // check dans toutes les routes si le token correspond a son id

app.get('/jwtid', requireAuth, (req, res) => { // jwtId déclanche requireAuth  
  res.status(200).send({
    userId: res.locals.user._id,
    role: res.locals.user.role
  }) // renvoie d'ID utilisateur connecté
})


// Chemin vers les routes users
const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes');

// Routes
app.use('/', userRoutes);
app.use('/api/auth', userRoutes);
app.use('/api/post', postRoutes);

module.exports = app;