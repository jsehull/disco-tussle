// TODO - dynamic player turn


const floorTilesArr = [
  { color: 'red' }, { color: 'red' }, { color: 'red' },
  { color: 'cyan' }, { color: 'cyan' }, { color: 'cyan' },
  { color: 'green' }, { color: 'green' }, { color: 'green' },
  { color: 'orange' }, { color: 'orange' }, { color: 'orange' },
  { color: 'pink' }, { color: 'pink' }, { color: 'pink' },
  { color: 'purple' }, { color: 'purple' }, { color: 'purple' },
  { color: 'yellow' }, { color: 'yellow' }, { color: 'yellow' },
  { color: 'blue' }, { color: 'blue' }, { color: 'blue' },
  { color: 'wild' }
]

const danceFloor = document.getElementById('dance-floor')
let floorTile
let tilesChosen = []

loadDanceFloor()

function loadDanceFloor() {
  for (let i = 0; i < floorTilesArr.length; i++) {
    floorTile = document.createElement('div')
    floorTile.classList.add('floor-tile')
    floorTile.setAttribute('tile-id', i)

    floorTile.addEventListener('click', lightUpTile)
    // FIXME unable to access floorTilesArr[i].color

    danceFloor.appendChild(floorTile)
  }

}

function lightUpTile() {
  const tileId = this.getAttribute('tile-id')
  tilesChosen.push(floorTilesArr[tileId].color)
  console.log(tilesChosen)

  // floorTile.classList.add(floorTilesArr[i].color)

  getPlayerTurn()
}

// let player = document.getElementsByClassName('player')
const playerOne = document.getElementById('player-one')
const playerTwo = document.getElementById('player-two')


// const playerAny = document.getElementsByClassName('player')
// console.log('playerAny', playerAny)
let newsFeed = document.getElementById('news-feed')

function getPlayerTurn() {
  if (tilesChosen.length === 3) {
    validateTurn()
  }

  return
}

function updateNewsFeed(feedMessage) {
    window.setTimeout(() => {
      newsFeed.innerText = 'Player1 ' + feedMessage
    }, 200)

    // TODO - update feed on player turn change
}

function updateActivePlayer() {
    if (playerOne.classList.contains('active')) {
      playerOne.classList.remove('active')
      playerTwo.classList.add('active')
    } else if (playerTwo.classList.contains('active')) {
      playerName.classList.remove('active')
      playerOne.classList.add('active')
      playerTwo.classList.remove('active')
    }
}

function validateTurn() {
  if (tilesChosen[0] === tilesChosen[1] && tilesChosen[1] === tilesChosen[2]) {
    updateNewsFeed('gets a point')
  } else if (tilesChosen.includes('wild')) {
    updateNewsFeed('gets a BONUS turn')
  } else {
    updateNewsFeed('turn over')
    updateActivePlayer()
  }
}
