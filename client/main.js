
let playersContainer = document.querySelector('#players-container')
let form = document.querySelector('form')
let baseURL = `http://localhost:4433`



let playersCallback = ({ data: players }) => displayPlayers(players)
let errCallback = err => console.log(err)

let createPlayer = body => axios.post(`${baseURL}/api/players/`, body).then(playersCallback).catch(errCallback)
let deletePlayer = id => axios.delete(`${baseURL}/api/players/:${id}`).then(playersCallback).catch(errCallback)
let updatePlayer = (id, type, numberType) => axios.put(`${baseURL}/api/players/${id}`, {type, numberType}).then(playersCallback).catch(errCallback)


function submitHandler(e) {
    e.preventDefault()

    let name = document.querySelector('#player-name')
    let commanderName = document.querySelector('#commander-name')
    let partnerName = document.querySelector('#partner-name')
    let companionName = document.querySelector('#companion-name')


 

    let bodyObj = {
        name: name.value,
        commanderName: commanderName.value,
        partnerName: partnerName.value,
        companionName: companionName.value,
        lifeTotal: 40,
        commanderTax: 0,
        infectDamage: 0,
        stormCount: 0
    }

    createPlayer(bodyObj)

    name.value = ''
    commanderName.value = ''
    partnerName.value = ''
    companionName.value = ''
}

function createPlayerCard(player) {
    let playerCard = document.createElement('div')
    playerCard.classList.add('player-card')

    playerCard.innerHTML = `
    <p class="player-name">${player.name}</p>
    <p class="commander-name">${player.commanderName}</p>
    <img alt="img-commander" src=${player.commanderURL} class="img-commander"/>


    <p class="partner-name">${player.partnerName}</p>`+
    player.partnerURL ? `<img alt='img-partner' src=${player.partnerURL} class="img-partner"/>` : '' +
    `<p class='companion-name'>${player.companionName}</p>`
    player.companionURL ? `<img alt='img-companion' src=${player.companionURL} class="img-companion"/>` : '' +

`<div class="lifeTotal-container">
        
    <p class='lifeTotal'>Life: <button id="minus-button" onclick="updatePlayer(${player.id}, 'minus','lifeTotal')">-</button>${player.lifeTotal}<button id="plus-button" onclick="updatePlayer(${player.id}, 'plus','lifeTotal')">+</button></p>
        
</div>

<div class="commanderTax-container">
           
<p class='commander-tax'>Tax: <button id="minus-button" onclick="updatePlayer(${player.id}, 'minus','commanderTax')">-</button>  ${player.commanderTax}  <button id="plus-button" onclick="updatePlayer(${player.id}, 'plus','commanderTax')">+</button>
</div></p>
  

<div class="infectDamage-container">
           
<p class='infect-damage'>Poison: <button id="minus-button" onclick="updatePlayer(${player.id}, 'minus','infectDamage')">-</button>${player.infectDamage}<button id="plus-button" onclick="updatePlayer(${player.id}, 'plus','infectDamage')">+</button></p>

</div>  

<div class="stormCount-container">

        
<p class='storm-count'>Storm count: <button id="minus-button" onclick="updatePlayer(${player.id}, 'minus','stormCount')">-</button> ${player.stormCount}<button id="plus-button" onclick="updatePlayer(${player.id}, 'plus','stormCount')">+</button>
</div></p>
 


    <button onclick="deletePlayer(${player.id})">delete</button>

    `


    playersContainer.appendChild(playerCard)
}

function displayPlayers(arr) {
    playersContainer.innerHTML = ``
    for (let i = 0; i < arr.length; i++) {
        console.log(arr[i])    
        createPlayerCard(arr[i])
    }
}

form.addEventListener('submit', submitHandler)

