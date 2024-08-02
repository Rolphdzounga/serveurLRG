/***********************************/
/*** Import des module nécessaires */
const jwt = require('jsonwebtoken')

/*************************/
/*** Extraction du token */
const extractBearer = authorization => {

    if(typeof authorization !== 'string'){
        return false
    }

    // On isole le token
    const matches = authorization.match(/(bearer)\s+(\S+)/i)

    return matches && matches[2]

}


/******************************************/
/*** Vérification de la présence du token */
const checkTokenMiddleware = (req, res, next) => {

    const token = req.headers.authorization && extractBearer(req.headers.authorization)

    console.log('token____', token)
    if(!token){
        return res.status(401).json({ message: 'Ho le petit malin !!!'})
    }

    // Vérifier la validité du token
    /*jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
        if(err){
            return res.status(401).json({message: 'Bad token'})
        }

        next()
    })*/

        console.log('___before try block___')
        try {
            const verified = jwt.verify(token, process.env.JWT_SECRET)
            console.log('verify____',verified)
            if (verified) {
              //return res.status(200).json({ safehouseKey: 'under-the-doormat', message: 'success' })
              next()
            } else {
              // Access Denied
              return res.status(401).json({ message: 'Bad token' })
            }
          } catch (error) {
            // Access Denied
            console.log('Access Denied___')
            return res.status(401).json({ message: 'error' })
          }
}

module.exports = checkTokenMiddleware