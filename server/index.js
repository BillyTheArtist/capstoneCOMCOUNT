let express = require('express')
let cors = require('cors')
let app = express()

require("dotenv").config()
//---MIDDLEWARE---
app.use(cors())
app.use(express.json())
//---MIDDLEWARE---
let {home} = require("./pageFolder/pageCtrl")
app.get("/", home)

let {
    deletePlayer,
    createPlayer,
    updatePlayer
} = require('./controller')

app.delete(`/api/players/:id`, deletePlayer)
app.post(`/api/players`, createPlayer)
app.put(`/api/players/:id`, updatePlayer)

const { PORT } = process.env
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))
