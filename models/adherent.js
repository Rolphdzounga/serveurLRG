/************************************/
/*** Import des modules nécessaires */
const { Sequelize } = require('sequelize')

/*******************************/
/*** Définition du modèle Adherent */
module.exports = (sequelize) => {
    return Adherent = sequelize.define('Adherent', {
        noms: {type: Sequelize.STRING,  allowNull: false },
    prenoms: {type: Sequelize.STRING,  allowNull: false },
    email: {type: Sequelize.STRING, allowNull: false,validate:{isEmail:true} },
    datenaissance: {type: Sequelize.DATE,  allowNull: false },
    lieunaissance: {type: Sequelize.STRING,  allowNull: false },
    telephone: {type: Sequelize.STRING, allowNull: false },
    paysmilitantisme: {type: Sequelize.STRING,  allowNull: true },
    provincemilitantisme: {type: Sequelize.STRING,  allowNull: true },
    communemilitantisme: {type: Sequelize.STRING,  allowNull: true },
    arrmilitantisme: {type: Sequelize.STRING,  allowNull: true },
    departementmilitantime: {type: Sequelize.STRING,  allowNull: true },
    centrevotemilitantisme: {type: Sequelize.STRING,  allowNull: true },
    sexe: {type: Sequelize.STRING, allowNull: false },
    pieceidentite: {type: Sequelize.STRING, allowNull: false },
    numpieceidentite: {type: Sequelize.STRING, allowNull: false },
    adresse: {type: Sequelize.STRING,  allowNull: false },
    montantquotisation: {type: Sequelize.STRING,  allowNull: false },
    profession: {type: Sequelize.STRING,  allowNull: false },
    signature: {type: Sequelize.TEXT,  allowNull: false },
    photo: {type: Sequelize.TEXT,  allowNull: false },
    }, { paranoid: true,modelName: "Adherent",
        tableName: "adherent",
        underscore: true,
        timestamps: true, })           // Ici pour faire du softDelete
}


/****************************************/
/*** Ancienne Synchronisation du modèle */
// Adherent.sync()
//Adherent.sync({force: true})
// Adherent.sync({alter: true})

