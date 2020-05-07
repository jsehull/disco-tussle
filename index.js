// TODO 1. ✅ add 'selected' class for tiles
    //  FIXME - 2. removeEventListener???


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

const menuCard = document.getElementById('menu-card')
const singlePlayerBtn = document.getElementById('one-player-game')
const multiPlayerBtn = document.getElementById('multiplayer-game')
const gameCard = document.getElementById('game-card')
const overlayBox = document.getElementById('overlay-box')
const multiPlayerBox = document.getElementById('multi-player-box')
const playerOneScoreEl = document.getElementById('player-one-score')
const playerTwoScoreEl = document.getElementById('player-two-score')
let playerOnePoints = 0;
let playerTwoPoints = 0;



loadMainMenu()

function loadMainMenu() {
  showGameTitle()
  showGameModes()
  getGameMode()
}

function showGameTitle() {
  window.setTimeout(() => {
    document.getElementById('menu-logo').classList.add('active')
  }, 250)
}

function showGameModes() {
  window.setTimeout(() => {
    document.getElementById('menu-nav').classList.add('active')
  }, 1500)
}

function getGameMode() {
  singlePlayerBtn.addEventListener('click', setSinglePlayerMode)
  multiPlayerBtn.addEventListener('click', setMultiPlayerMode)
}

function closeMainMenu() {
  window.setTimeout(() => {
    menuCard.classList.remove('active')
    gameCard.classList.add('active')
    singlePlayerBtn.classList.remove('clicked')
    multiPlayerBtn.classList.remove('clicked')
  }, 1000)
}

function openMainMenu() {
  menuCard.classList.add('active')
  gameCard.classList.remove('active')
  gameCard.classList.remove('multi-player')
  overlayBox.classList.remove('multi-player')
}

function setSinglePlayerMode() {
  singlePlayerBtn.classList.add('clicked')

  closeMainMenu()
}


function setMultiPlayerMode() {
  swapToPlayerOne()
  multiPlayerBtn.classList.add('clicked')
  multiPlayerBox.classList.add('active')
  gameCard.classList.add('multi-player')
  playerOneScoreEl.innerText = playerOnePoints
  playerTwoScoreEl.innerText = playerTwoPoints
  overlayBox.classList.add('multi-player')

  closeMainMenu()
}

const danceFloor = document.getElementById('dance-floor')
let floorTile
let tripleMatches = []
let tileElsChosen = []
let tilesChosen = []

loadDanceFloor()

function loadDanceFloor() {
  floorTilesArr.sort(() => 0.5 - Math.random())

  for (let i = 0; i < floorTilesArr.length; i++) {
    floorTile = document.createElement('div')
    floorTile.classList.add('floor-tile')
    floorTile.setAttribute('tile-id', i)
    floorTile.addEventListener('click', (e) => lightUpTile(e))
    danceFloor.appendChild(floorTile)

    if (floorTilesArr[i].color === 'wild') {
      floorTile.id = 'wild-tile'
    }
  }
}

function clearDanceFloor() {
  danceFloor.innerHTML = ''
}

let tileEl
let tileId

function lightUpTile(e) {
  tileEl = e.target
  tileId = e.target.getAttribute('tile-id')
  tilesChosen.push(floorTilesArr[tileId])
  tileElsChosen.push(tileEl)
  tileEl.classList.add('selected')
  tileEl.classList.add(floorTilesArr[tileId].color)

  // giveTileUnselectable()
  showPickCountInFeed()

  if (tilesChosen.length === 3) {
    validateTurn(tileElsChosen, tilesChosen)
  }
}

// TODO
// function giveTileUnselectable() {
//   console.log('tileEl -', tileEl)
//   if (tileEl.classList.contains('selected')) {
//     console.log('test')
//     tileEl.removeEventListener('click', () => lightUpTile())
//   }
// }

function showPickCountInFeed() {
  if (tripleMatches.length !== 8 && tilesChosen.length === 0) {
    newsFeed.innerText = '3 picks remaining'
  } else if (tilesChosen.length === 1) {
    newsFeed.innerText = '2 picks remaining'
  } else if (tilesChosen.length === 2) {
    newsFeed.innerText = '1 picks remaining'
  }
}

function validateTurn(tileElsChosen, tilesChosen) {
  const tileElOne = tileElsChosen[0]
  const tileElTwo = tileElsChosen[1]
  const tileElThree = tileElsChosen[2]
  let tilesMatch = tilesChosen[0].color === tilesChosen[1].color
    && tilesChosen[1].color === tilesChosen[2].color

  if (tilesMatch) {
    updateNewsFeed('You found a match!')
    updatePlayerScore()
    window.setTimeout(() => {
      tileElOne.classList.add('matching')
      tileElTwo.classList.add('matching')
      tileElThree.classList.add('matching')
    }, 250)
    tripleMatches.push(tilesChosen)
  } else {
    updateNewsFeed('Try again')
    resetCurrentTileSelection(tilesChosen, tileElOne, tileElTwo, tileElThree)
    changeActivePlayer()
  }

  checkGameWon(tileElsChosen)
}

const playerOne = document.getElementById('player-one')
const playerTwo = document.getElementById('player-two')

function changeActivePlayer() {
  if (playerOne.classList.contains('active')) {
    swapToPlayerTwo()
  } else if (playerTwo.classList.contains('active')) {
    swapToPlayerOne()
  }
}

function swapToPlayerOne() {
  playerTwo.classList.remove('active')
  playerTwoScoreEl.classList.remove('active')
  playerOne.classList.add('active')
  playerOneScoreEl.classList.add('active')
}

function swapToPlayerTwo() {
  playerOne.classList.remove('active')
  playerOneScoreEl.classList.remove('active')
  playerTwo.classList.add('active')
  playerTwoScoreEl.classList.add('active')
}

function updatePlayerScore() {
  if (playerOne.classList.contains('active')) {
    playerOnePoints++;
    playerOneScoreEl.innerText = playerOnePoints
  } else if (playerTwo.classList.contains('active')) {
    playerTwoPoints++;
    playerTwoScoreEl.innerText = playerTwoPoints
  }
}

function resetPlayerPoints() {
  playerOnePoints = 0;
  playerOneScoreEl.innerText = playerOnePoints;
  playerTwoPoints = 0;
  playerTwoScoreEl.innerText = playerTwoPoints;
}

function resetCurrentTileSelection(tilesChosen, tileElOne, tileElTwo, tileElThree) {
  window.setTimeout(() => {
    tileElOne.classList.remove('selected')
    tileElOne.classList.remove(tilesChosen[0].color)
    tileElTwo.classList.remove('selected')
    tileElTwo.classList.remove(tilesChosen[1].color)
    tileElThree.classList.remove('selected')
    tileElThree.classList.remove(tilesChosen[2].color)
  }, 800)
}

let newsFeed = document.getElementById('news-feed')

function updateNewsFeed(feedMessage) {
    newsFeed.innerText = feedMessage

    window.setTimeout(() => {
      showPickCountInFeed()
    }, 800)
}

function checkGameWon() {
  if (tripleMatches.length === 8) {
    showWildTile()

    window.setTimeout(() => {
      showWinOverlay()
    }, 1500)
  }

  tileElsChosen = []
  tilesChosen = []
}

function showWildTile() {
  window.setTimeout(() => {
    document.getElementById('wild-tile').classList.add('wild')
  }, 500)
}

const winOverlay = document.getElementById('win-overlay')
const playAgainBtn = document.getElementById('play-again-btn')
const mainMenuBtn = document.getElementById('main-menu-btn')

function showWinOverlay() {
  winOverlay.classList.add('active')

  playAgainBtn.addEventListener('click', () => {
    window.setTimeout(() => {
      reloadDanceFloor()
      winOverlay.classList.remove('active')
    }, 1500)

  })

  mainMenuBtn.addEventListener('click', () => {
    mainMenuBtn.classList.add('clicked')

    window.setTimeout(() => {
      winOverlay.classList.remove('active')
      multiPlayerBox.classList.remove('active')
      reloadDanceFloor()
      openMainMenu()
      mainMenuBtn.classList.remove('clicked')
    }, 1000)
  })
}

function reloadDanceFloor() {
  clearDanceFloor()
  loadDanceFloor()
  resetPlayerPoints()
  tripleMatches = []
  tileElsChosen = []
  tilesChosen = []
  showPickCountInFeed()
  swapToPlayerOne()
}
