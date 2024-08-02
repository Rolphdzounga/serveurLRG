/***********************************/
/*** Import des module nécessaires */
const DB = require('../db.config')
const Adherent = DB.Adherent
const User = DB.User

/**************************************/
/*** Routage de la ressource Adherent */

exports.getAllAdherents = (req, res) => {
    const { start, size, filters, sorting, globalFilter } = req.query
    Adherent.findAll({paranoid: false})
        .then(tab => {
            console.log('adherents___',tab)


            if(filters){
                const parsedColumnFilters = filters && JSON.parse(filters||[]) 
                if (!!parsedColumnFilters?.length) {
                  parsedColumnFilters.map((filter) => {
                    const { id: columnId, value: filterValue } = filter;
                    tab = tab.filter((row) => {
                      return row[columnId]
                        ?.toString()
                        ?.toLowerCase()
                        ?.includes?.((filterValue).toLowerCase());
                    });
                  });
                }
            
              }
              
            
              if (globalFilter) {
                tab = tab.filter((row) =>
                  Object.keys(row).some((columnId) =>
                   row[columnId]
                      ?.toString()
                      ?.toLowerCase()
                      ?.includes?.((globalFilter).toLowerCase()),
                  ),
                );
              }
            
              if(sorting){
                const parsedSorting = sorting && JSON.parse(sorting)
                if (!!parsedSorting?.length) {
                  const sort = parsedSorting[0];
                  const { id, desc } = sort;
                  tab.sort((a, b) => {
                    if (desc) {
                      return a[id] < b[id] ? 1 : -1;
                    }
                    return a[id] > b[id] ? 1 : -1;
                  });
                }
              }
              
            
            
            
              let resultat = {
                data: 
                 tab?.slice(parseInt(start), parseInt(start) + parseInt(size)) ?? [],
                meta: { totalRowCount: tab.length },
                all: tab ?? []
              }
              console.log('_resultat_',resultat)
            return  res.send(resultat)



           // return res.json({ data: adherents })
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
    console.log('req__________',req)
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
        
    // Validation des données reçues
    if (!prenoms ||
        !noms ||
        !email ||
        !telephone ||
        //!paysmilitantisme ||
        !provincemilitantisme ||
        !communemilitantisme ||
        //!arrmilitantisme ||
       // !villagemilitantisme ||
       // !cantonmilitantisme ||
        //!departementmilitantime ||
        !centrevotemilitantisme ||
        !sexe ||
        !pieceidentite ||
        !numpieceidentite ||
        !adresse ||
        !montantquotisation ||
        !photo ||
        !profession ||
        !lieunaissance ||
        !datenaissance ||
        !dateversement ||
        !signature ) {
        return res.status(400).json({ message: 'Missing Data' })
    }
    console.log('req.body____________',req)
    try{
        // Vérification si le coktail existe
        let adherent = await Adherent.findOne({ where: { email: email }, raw: true })
        if (adherent !== null) {
            return res.status(409).json({ message: `The adherent ${email} already exists !` })
        }
        console.log('____________dans la creation adherents___________________')
        
        // Céation du adherent
        adherent = await Adherent.create(req.query)
        console.log('adherent__________ok________',adherent)
        return res.json({ message: 'Adherent Created', data: adherent })
    }catch(err){
        console.log('res____________________________________________')
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
            return res.status(404).json({ message: 'This adherent does not exist !' })
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