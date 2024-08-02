/***********************************/
/*** Import des module nécessaires */
const express = require('express')
const checkTokenMiddleware = require('../jsonwebtoken/check')
const adherentCtrl = require('../controllers/adherent')
console.log('adherentCtrl__',adherentCtrl)
/***************************************/
/*** Récupération du routeur d'express */
let router = express.Router()

/*********************************************/
/*** Middleware pour logger dates de requete */
router.use( (req, res, next) => {
    const event = new Date()
    console.log('Cocktail Time:', event.toString())
    next()
})

/**************************************/
/*** Routage de la ressource Cocktail */

router.get('', adherentCtrl.getAllAdherents)

router.get('/:id', adherentCtrl.getAdherent)

//router.put('', checkTokenMiddleware, adherentCtrl.addAdherent)
router.put('',  adherentCtrl.addAdherent)

router.patch('/:id', checkTokenMiddleware, adherentCtrl.updateAdherent)

router.post('/untrash/:id', checkTokenMiddleware, adherentCtrl.untrashAdherent)
    
router.delete('/trash/:id', checkTokenMiddleware, adherentCtrl.trashAdherent)

router.delete('/:id', checkTokenMiddleware, adherentCtrl.deleteAdherent)

module.exports = router