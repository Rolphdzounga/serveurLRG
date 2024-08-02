/************************************/
/*** Import des modules nécessaires */
const { DataTypes } = require('sequelize')
const bcrypt = require('bcrypt')

/*******************************/
/*** Définition du modèle User */
module.exports = (sequelize) => {
    const User = sequelize.define('User', {
        email: {type: DataTypes.STRING, unique: true, allowNull: false,validate:{isEmail:true} },
        password: {type: DataTypes.STRING, allowNull: false },
        noms:{
        type: DataTypes.STRING(100),
        defaultValue: '',
        allowNull: true
        },
        prenoms:{
            type: DataTypes.STRING(100),
            defaultValue: '',
            allowNull: true
        },
        pseudo:{
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true
        },
        createdAt: {
            allowNull: false,
            defaultValue: new Date(),
            type: DataTypes.DATE
          },
          updatedAt: {
            allowNull: false,
            defaultValue: new Date(),
            type: DataTypes.DATE
          }
    }, { paranoid: true,modelName: "User",
        tableName: "users",
        timestamps: true, })           // Ici pour faire du softDelete
    
    User.beforeCreate( async (user, options) => {
        let hash = await bcrypt.hash(user.password, parseInt(process.env.BCRYPT_SALT_ROUND))
        user.password = hash
    })
    
    User.checkPassword = async (password, originel) => {
        return await bcrypt.compare(password, originel)
    }

    return User
}


/****************************************/
/*** Ancienne Synchronisation du modèle */
//User.sync()
//User.sync({force: true})
//User.sync({alter: true})
