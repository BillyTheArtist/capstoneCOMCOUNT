let express = require('express')
let cors = require('cors')
let app = express()
//---MIDDLEWARE---
app.use(cors())
app.use(express.json())
// let players = require('./db.json')
//---MIDDLEWARE---



let {
    deletePlayer,
    createPlayer,
    updatePlayer
} = require('./controller')


app.delete(`/api/players/:id`, deletePlayer)
app.post(`/api/players`, createPlayer)
app.put(`/api/players/:id`, updatePlayer)


let PORT = 4433
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))
