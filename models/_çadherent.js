/************************************/
/*** Import des modules nécessaires */
const { DataTypes } = require('sequelize')

/*******************************/
/*** Définition du modèle Adherent */
module.exports = (sequelize) => {
    return Adherent = sequelize.define(
        "Adherent",
        {
          noms: {type: DataTypes.STRING(50),  allowNull: false },
          prenoms: {type: DataTypes.STRING(100),  allowNull: false },
          email: {type: DataTypes.STRING(50), unique: true, allowNull: false,validate:{isEmail:true} },
          datenaissance: {type: DataTypes.DATE,  allowNull: false },
          lieunaissance: {type: DataTypes.STRING(50),  allowNull: false },
          telephone: {type: DataTypes.STRING(15), unique: true, allowNull: false },
          paysmilitantisme: {type: DataTypes.STRING(20),  allowNull: true },
          provincemilitantisme: {type: DataTypes.STRING(20),  allowNull: false },
          communemilitantisme: {type: DataTypes.STRING(20),  allowNull: true },
          arrmilitantisme: {type: DataTypes.STRING(5),  allowNull: true },
          departementmilitantime: {type: DataTypes.STRING(30),  allowNull: true },
          centrevotemilitantisme: {type: DataTypes.STRING(30),  allowNull: true },
          sexe: {type: DataTypes.STRING(1), allowNull: false },
          pieceidentite: {type: DataTypes.STRING(15), allowNull: false },
          numpieceIdentite: {type: DataTypes.STRING(30), unique: true, allowNull: false },
          adresse: {type: DataTypes.STRING(200),  allowNull: false },
          montantquotisation: {type: DataTypes.STRING(8),  allowNull: false },
          profession: {type: DataTypes.STRING(25),  allowNull: false },
          signature: {type: DataTypes.TEXT,  allowNull: false },
          photo: {type: DataTypes.TEXT,  allowNull: false },
          //dateAdhesion: {type: DataTypes.DATE, allowNull: false }
        },
        {
          // options
          modelName: "Adherent",
          tableName: "adherent",
          underscore: true,
          timestamps: true,
          paranoid:true
        }
      )          // Ici pour faire du softDelete
}


/****************************************/
/*** Ancienne Synchronisation du modèle */
//Adherent.sync()
// Adherent.sync({force: true})
// Adherent.sync({alter: true})

