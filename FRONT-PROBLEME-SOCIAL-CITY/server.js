const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes');
//chemin qui nous amene vers tous nos variables d'environnement
require('dotenv').config({path: './config/.env'});
require('./config/db');
const { checkUser, requireAuth } = require('./middleware/auth.middleware');
const cors = require('cors');
const app = express();


const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'methods': 'GET, HEAD, PUT, PATCH, DELETE',
    'preflightContinue': false
};
// On autorise tout le monde à nous faire des requetes
// Les datas sont disponibles pour n'importe qui(que des clients de notre site)
app.use(cors(corsOptions));

// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

//jwt pour n'imporet quelle route
app.get('*', checkUser);
// permettra de tester le token de l'utilisateur quand il arrive sur le site
// ça permettra à l'utilisateur de ne pas à chercher à se connecter à chaque fois.
app.get('/jwtid', requireAuth, (req, res) => {
    res.status(200).send(res.locals.user._id)
});


// routes
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);
// server
app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`);
});
