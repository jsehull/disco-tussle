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

floorTilesArr.sort(() => 0.5 - Math.random())

const danceFloor = document.getElementById('dance-floor')
let floorTile
let tripleMatches = []

loadDanceFloor()

function loadDanceFloor() {
  for (let i = 0; i < floorTilesArr.length; i++) {
    floorTile = document.createElement('div')
    floorTile.classList.add('floor-tile')
    floorTile.setAttribute('tile-id', i)
    floorTile.addEventListener('click', (e) => lightUpTile(e))
    danceFloor.appendChild(floorTile)
  }
}

let tileEl
let tileId
let tileElsChosen = []
let tilesChosen = []

function lightUpTile(e) {
  tileEl = e.target
  tileId = e.target.getAttribute('tile-id')
  tilesChosen.push(floorTilesArr[tileId])
  tileElsChosen.push(tileEl)
  e.target.classList.add(floorTilesArr[tileId].color)

  showPickCountInFeed()

  if (tilesChosen.length === 3) {
    validateTurn(tileElsChosen, tilesChosen)
  }
}

function validateTurn(tileElsChosen, tilesChosen) {
  const tileElOne = tileElsChosen[0]
  const tileElTwo = tileElsChosen[1]
  const tileElThree = tileElsChosen[2]
  let tilesMatch = tilesChosen[0].color === tilesChosen[1].color
    && tilesChosen[1].color === tilesChosen[2].color

  if (tilesMatch) {
    resetPicksInFeed('You found a match!')
    window.setTimeout(() => {
      tileElOne.classList.add('matching')
      tileElTwo.classList.add('matching')
      tileElThree.classList.add('matching')
    }, 250)
    tripleMatches.push(tilesChosen)
  } else if (tilesChosen.includes('wild')) {
    // FIXME no longer recognizes WILD
    resetPicksInFeed('You get a BONUS turn')
  } else {
    resetPicksInFeed('Try again')
    resetCurrentTileSelection(tilesChosen, tileElOne, tileElTwo, tileElThree)
    // changeActivePlayer() // activate for multiplayer
  }

  checkGameWon()
}

function resetCurrentTileSelection(tilesChosen, tileElOne, tileElTwo, tileElThree) {
  window.setTimeout(() => {
    tileElOne.classList.remove(tilesChosen[0].color)
    tileElTwo.classList.remove(tilesChosen[1].color)
    tileElThree.classList.remove(tilesChosen[2].color)
  }, 800)
}

let newsFeed = document.getElementById('news-feed')

function showPickCountInFeed() {
  if (tripleMatches.length !== 8 && tilesChosen.length === 0) {
    newsFeed.innerText = '3 picks remaining'
  } else if (tilesChosen.length === 1) {
    newsFeed.innerText = '2 picks remaining'
  } else if (tilesChosen.length === 2) {
    newsFeed.innerText = '1 picks remaining'
  }
}

function resetPicksInFeed(feedMessage) {
    newsFeed.innerText = feedMessage

    window.setTimeout(() => {
      showPickCountInFeed()
    }, 800)
}

function checkGameWon() {
  if (tripleMatches.length === 8) {
    console.log('WINNER')
    newsFeed.innerText = 'Congratulations'
  }

  tileElsChosen = []
  tilesChosen = []
}


// let player = document.getElementsByClassName('player')
// const playerOne = document.getElementById('player-one')
// const playerTwo = document.getElementById('player-two')


// const playerAny = document.getElementsByClassName('player')
// console.log('playerAny', playerAny)

// function changeActivePlayer() { // activate for multiplayer
//     if (playerOne.classList.contains('active')) {
//       playerOne.classList.remove('active')
//       playerTwo.classList.add('active')
//     } else if (playerTwo.classList.contains('active')) {
//       playerName.classList.remove('active')
//       playerOne.classList.add('active')
//       playerTwo.classList.remove('active')
//     }
// }
