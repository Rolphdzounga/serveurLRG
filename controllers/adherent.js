/***********************************/
/*** Import des module nécessaires */
const DB = require('../db.config')
const Adherent = DB.Adherent
const User = DB.User

/**************************************/
/*** Routage de la ressource Adherent */

exports.getAllAdherents = (req, res) => {
    Adherent.findAll({paranoid: false})
        .then(adherents => {
            console.log('adherents___',adherents)
            return res.json({ data: adherents })
        })
        .catch(err => res.status(500).json({ message: 'Database Error', error: err }))
}

exports.getAdherent = async (req, res) => {
    let adherentId = parseInt(req.params.id)

    // Vérification si le champ id est présent et cohérent
    if (!adherentId) {
        return res.json(400).json({ message: 'Missing Parameter' })
    }

    try {
        // Récupération du adherent
        let adherent = await Adherent.findOne({ where: { id: adherentId }, include: {model: User, attributes:['id','pseudo','email']} })

        // Test si résultat
        if (adherent === null) {
            return res.status(404).json({ message: 'This adherent does not exist !' })
        }

        // Renvoi du Adherent trouvé
        return res.json({ data: adherent })
    } catch (err) {
        return res.status(500).json({ message: 'Database Error', error: err })
    }
}

exports.addAdherent = async (req, res) => {
    /*console.log({
        prenoms: 'A',
        noms: 'A',
        email: 'rolphfrancel@gmail.com',
        telephone: '4',
        paysmilitantisme: 'gabon',
        provincemilitantisme: 'G1-Estuaire',
        communemilitantisme: 'Akanda',
        arrmilitantisme: '4',
        villagemilitantisme: 'mon bled',
        cantonmilitantisme: 'Owendo',
        departementmilitantime: 'Como',
        centrevotemilitantisme: '4',
        sexe: 'H',
        accordadherent: true,
        pieceidentite: 'cni',
        numpieceidentite: 'a',
        adresse: 'a',
        montantquotisation: '10000', profession: 'a',
        lieunaissance: 'a',
        datenaissance: '2024-07-09T23:00:00.000Z',
        dateversement: '2024-07-23T23:00:00.000Z',signature:'ma signature',photo:'ma photo'})*/
    const { prenoms,
        noms,
        email,
        telephone,
        paysmilitantisme,
        provincemilitantisme,
        communemilitantisme,
        arrmilitantisme,
        villagemilitantisme,
        cantonmilitantisme,
        departementmilitantime,
        centrevotemilitantisme,
        sexe,
        pieceidentite,
        numpieceidentite,
        adresse,
        montantquotisation,
        photo,
        profession,
        lieunaissance,
        datenaissance,
        dateversement,
        signature} = req.body
        console.log('email_____',email)
    // Validation des données reçues
    if (!prenoms ||
        !noms ||
        !email ||
        !telephone ||
        !communemilitantisme ||
        !centrevotemilitantisme ||
        !sexe ||
        !numpieceidentite ||
        !adresse ||
        !montantquotisation ||
        !photo ||
        !datenaissance ||
        !dateversement ||
        !signature ) {
        return res.status(400).json({ message: 'Missing Data' })
    }

    try{
        // Vérification si le coktail existe
        /*let adherent = await Adherent.findOne({ where: { email: email }, raw: true })
        if (adherent !== null) {
            return res.status(409).json({ message: `Cet adherent ${email} exists déjà !` })
        }*/
        //console.log({...req.body,photo:'ma photo',signature:'ma signature'})
        // Céation du adherent
        //adherent = await Adherent.create({...req.body,photo:'ma photo',signature:'ma signature'})
        let adherent = await Adherent.create({
            prenoms: prenoms,
            noms: noms,
            email: email,
            telephone: telephone,
            paysmilitantisme: paysmilitantisme,
            provincemilitantisme: provincemilitantisme,
            communemilitantisme: communemilitantisme,
            arrmilitantisme: arrmilitantisme,
            villagemilitantisme: villagemilitantisme,
            cantonmilitantisme: cantonmilitantisme,
            departementmilitantime: departementmilitantime,
            centrevotemilitantisme: centrevotemilitantisme,
            sexe: sexe,
            //accordadherent: true,
            pieceidentite: pieceidentite,
            numpieceidentite: numpieceidentite,
            adresse: adresse,
            montantquotisation: montantquotisation, profession: profession,
            lieunaissance: lieunaissance,
            datenaissance: datenaissance,
            dateversement: dateversement,signature:signature,photo:photo})

        console.log(adherent)
        return res.json({ message: 'Adherent créé avec succès', data: adherent })
    }catch(err){
        console.log(err)
        return res.status(500).json({ message: 'Database Error', error: err })
    }
}

exports.updateAdherent = async (req, res) => {
    let adherentId = parseInt(req.params.id)

    // Vérification si le champ id est présent et cohérent
    if (!adherentId) {
        return res.status(400).json({ message: 'Missing parameter' })
    }

    try{
        // Recherche du adherent et vérification
        let adherent = await Adherent.findOne({ where: { id: adherentId }, raw: true })
        if (adherent === null) {
            return res.status(404).json({ message: "Cet adherent n'existe pas !" })
        }

        // Mise à jour du adherent
        await Adherent.update(req.body, { where: { id: adherentId } })
        return res.json({ message: 'Adherent Updated' })
    }catch(err){
        return res.status(500).json({ message: 'Database Error', error: err })
    }    
}

exports.untrashAdherent = (req, res) => {
    let adherentId = parseInt(req.params.id)

    // Vérification si le champ id est présent et cohérent
    if (!adherentId) {
        return res.status(400).json({ message: 'Missing parameter' })
    }

    Adherent.restore({ where: { id: adherentId } })
        .then(() => res.status(204).json({}))
        .catch(err => res.status(500).json({ message: 'Database Error', error: err }))
}

exports.trashAdherent = (req, res) => {
    let adherentId = parseInt(req.params.id)

    // Vérification si le champ id est présent et cohérent
    if (!adherentId) {
        return res.status(400).json({ message: 'Missing parameter' })
    }

    // Suppression du adherent
    Adherent.destroy({ where: { id: adherentId } })
        .then(() => res.status(204).json({}))
        .catch(err => res.status(500).json({ message: 'Database Error', error: err }))
}

exports.deleteAdherent = (req, res) => {
    let adherentId = parseInt(req.params.id)

    // Vérification si le champ id est présent et cohérent
    if (!adherentId) {
        return res.status(400).json({ message: 'Missing parameter' })
    }

    // Suppression du adherent
    Adherent.destroy({ where: { id: adherentId }, force: true })
        .then(() => res.status(204).json({}))
        .catch(err => res.status(500).json({ message: 'Database Error', error: err }))
}