/************************************/
/*** Import des modules nécessaires */
const { Sequelize } = require('sequelize')

/************************************/
/*** Connexion à la base de données */
let sequelize = new Sequelize(
    process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'postgres',
        logging: false
    }
)

/*** Mise en place des relations */
const db = {}

db.sequelize = sequelize
db.User = require('./models/user')(sequelize)
db.Adherent = require('./models/adherent')(sequelize)

//db.User.hasMany(db.Cocktail, {foreignKey: 'user_id', onDelete: 'cascade'})
//db.Cocktail.belongsTo(db.User, {foreignKey: 'user_id'})
/*********************************/
/*** Synchronisation des modèles */
// sequelize.sync(err => {
//     console.log('Database Sync Error', err)
// })
//db.sequelize.sync({alter: true})
//db.sequelize.sync({force:true})
//db.Adherent.sync({force:true})
db.sequelize.sync()
module.exports = db