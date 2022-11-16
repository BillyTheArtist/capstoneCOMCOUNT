let players = require('./db.json')
let Magic = require('mtgsdk-ts')


module.exports = {

    deletePlayer: (req, res) => {
        let deleteId = req.params.id
        let index = players.findIndex(element => element.id === +deleteId)
        players.splice(index, 1)
        res.status(200).send(players)
    },

    createPlayer: async(req, res) => {
        let { name, commanderName, partnerName, companionName, lifeTotal, commanderTax, infectDamage, stormCount} = req.body
        let [response] = await Magic.Cards.where({name: commanderName, supertypes: 'Legendary'})
        let partnerResponse
        let companionResponse
        

        if (partnerName) {
            [partnerResponse] = await Magic.Cards.where({name: partnerName, supertypes: 'Legendary'})  
        } 

        if (companionName) {
            [companionResponse] = await Magic.Cards.where({name: companionName, supertypes: 'Legendary'})  
        } 

        let greatestId = -1
        for (let i = 0; i < players.length; i++) {
            if (players[i].id > greatestId) {
                greatestId = players[i].id
            }
        }



            let nextId = greatestId + 1
            
            let newPlayer = {
                id: nextId,
                name,
                commanderName: response.name,
                commanderURL: response.imageUrl,
                partnerName: partnerResponse ? partnerResponse.name : null,
                partnerURL: partnerResponse ? partnerResponse.imageUrl : null,
                companionName: companionResponse ? companionResponse.name : null,
                companionURL: companionResponse ? companionResponse.imageUrl: null,
                lifeTotal,
                commanderTax,
                infectDamage,
                stormCount
            }
            players.push(newPlayer)
            res.status(200).send(players)
    },
    updatePlayer: (req, res) => {
        let { id } = req.params
        let { type, numberType } = req.body
        let index = players.findIndex(elem => +elem.id === +id)
        
 

        if (type === 'plus') {
            players[index][numberType]++
            res.status(200).send(players)
        } else if (type === 'minus') {
            players[index][numberType]--
            res.status(200).send(players)
        } else {
            res.sendStatus(400)
        }
    }
}