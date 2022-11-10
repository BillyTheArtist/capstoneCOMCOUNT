let playersContainer = document.querySelector('#players-container')
let form = document.querySelector('form')
let baseURL = `http://localhost:4433`



let playersCallback = ({ data: players }) => displayPlayers(players)
let errCallback = err => console.log(err)

let createPlayer = body => axios.post(`${baseURL}/api/players/`, body).then(playersCallback).catch(errCallback)
let deletePlayer = id => axios.delete(`${baseURL}/api/players/:${id}`).then(playersCallback).catch(errCallback)


function submitHandler(e) {
    e.preventDefault()

    let name = document.querySelector('#player-name')
    let commanderName = document.querySelector('#commander-name')
    let commanderURL = document.querySelector('#img-commander')
    let partnerName = document.querySelector('#partner-name')
    let partnerURL = document.querySelector('#img-partner')
    let companionName = document.querySelector('#companion-name')
    let companionURL = document.querySelector('#img-companion')
    let lifeTotal = 40
    let commanderTax = 0
    let infectDamage = 0
    let stormCount = 0


    let bodyObj = {
        name: name.value,
        commanderName: commanderName.value,
        commanderURL: commanderURL.value,
        partnerName: partnerName.value,
        partnerURL: partnerURL.value,
        companionName: companionName.value,
        companionURL: commanderURL.value,
        lifeTotal: lifeTotal.value,
        commanderTax: commanderTax.value,
        infectDamage: infectDamage.value,
        stormCount: stormCount.value
    }

    createPlayer(bodyObj)

    name.value = ''
    commanderName.value = ''
    commanderURL.value = ''
    partnerName.value = ''
    partnerURL.value = ''
    companionName.value = ''
    companionURL.value = ''
    lifeTotal
    commanderTax
    infectDamage
    stormCount
}

function createPlayerCard(player) {
    let playerCard = document.createElement('div')
    playerCard.classList.add('player-card')

    playerCard.innerHTML = `
    <img alt='commander image' src=${player.commanderURL} class="commander-image"/>
    <p class="player-name">${player.name}</p>
    <button onclick="deletePlayer(${player.id})">delete</button>

    `


    playersContainer.appendChild(playerCard)
}

function displayPlayers(arr) {
    playersContainer.innerHTML = ``
    for (let i = 0; i < arr.length; i++) {
        createPlayerCard(arr[i])
    }
}

form.addEventListener('submit', submitHandler)

