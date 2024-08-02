/************************************/
/*** Import des modules nécessaires */
const express = require('express')
const cors = require('cors')
const checkTokenMiddleware = require('./jsonwebtoken/check')
const bodyParser = require('body-parser');
/************************************/
/*** Import de la connexion à la DB */
let DB = require('./db.config')

/*****************************/
/*** Initialisation de l'API */
const app = express()
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cors({
   origin: "*",
   methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
   allowedHeaders: "Origin, X-Requested-With, x-access-token, role, Content, Accept, Content-Type, Authorization"
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/***********************************/
/*** Import des modules de routage */
const user_router = require('./routes/users')
const adherent_router = require('./routes/adherents')

const auth_router = require('./routes/auth')

/******************************/
/*** Mise en place du routage */

app.get('/', (req, res) => {
    console.log('bla bla bla__________')
    return res.send(`I'm online. All is OK !`)
})

app.use('/users', user_router)
//app.use('/users', checkTokenMiddleware, user_router)
app.use('/adherents',checkTokenMiddleware, adherent_router)

app.use('/auth', auth_router)

app.get('*', (req, res) => res.status(501).send('What the hell are you doing !?!'))


/********************************/
/*** Start serveur avec test DB */
DB.sequelize.authenticate()
    .then(() => console.log('Database connection OK'))
    .then(() => {
        app.listen(process.env.SERVER_PORT, () => {
            console.log(`This server is running on port ${process.env.SERVER_PORT}. Have fun !`)
        })
    })
    .catch(err => console.log('Database Error', err))




