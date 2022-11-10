let players = require('./db.json')
lifeTotal = 40
commanderTax = 0
infectDamage = 0
stormCount = 0


module.exports = {

    deletePlayer: (req, res) => {
        let deleteId = req.params.id
        let index = players.findIndex(element => element.id === +deleteId)
        players.splice(index, 1)
        res.status(200).send(players)
    },

    createPlayer: (req, res) => {
        let { name, commanderName, commanderURL, partnerName, partnerURL, companionName, companionURL, lifeTotal, commanderTax, infectDamage, stormCount} = req.body

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
                commanderName,
                commanderURL,
                partnerName,
                partnerURL,
                companionName,
                companionURL,
                lifeTotal,
                commanderTax,
                infectDamage,
                stormCount
            }
            players.push(newPlayer)
            res.status(200).send(players)
    },
}