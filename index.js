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

const DELAY_ACTIVE_MATCHING = 250
const DELAY_TURN_CHOICES = 800 // un'select' & pick count in feed
const DELAY_MAIN_MENU = 1000
const DELAY_WIN_OVERLAY = 1500

const menuCard = document.getElementById('menu-card')
const singlePlayerBtn = document.getElementById('one-player-game')
const multiPlayerBtn = document.getElementById('multiplayer-game')
const gameCard = document.getElementById('game-card')
const overlayBox = document.getElementById('overlay-box')
const singlePlayerBox = document.getElementById('single-player-box')
const multiPlayerBox = document.getElementById('multi-player-box')
const p1ScoreEl = document.getElementById('player-one-score')
const p2ScoreEl = document.getElementById('player-two-score')
let p1Points = 0;
let p2Points = 0;



loadMainMenu()

function loadMainMenu() {
  showGameTitle()
  showGameModes()
  getGameMode()
}

function showGameTitle() {
  window.setTimeout(() => {
    document.getElementById('menu-logo').classList.add('active')
  }, DELAY_ACTIVE_MATCHING)
}

function showGameModes() {
  window.setTimeout(() => {
    document.getElementById('menu-nav').classList.add('active')
  }, DELAY_MAIN_MENU)
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
  }, DELAY_MAIN_MENU)
}

function resetMainMenu() {
  menuCard.classList.add('active')
  gameCard.classList.remove('active')
  gameCard.classList.remove('multi-player')
  overlayBox.classList.remove('multi-player')
}

function setSinglePlayerMode() {
  singlePlayerBtn.classList.add('clicked')
  singlePlayerBox.classList.add('active')
  document.getElementById('turn-count').innerText = 0

  closeMainMenu()
}

function setMultiPlayerMode() {
  swapToPlayerOne()
  multiPlayerBtn.classList.add('clicked')
  multiPlayerBox.classList.add('active')
  gameCard.classList.add('multi-player')
  p1ScoreEl.innerText = p1Points
  p2ScoreEl.innerText = p2Points
  overlayBox.classList.add('multi-player')

  closeMainMenu()
}

returnToMainMenu()

function returnToMainMenu() {
  const gameLogo = document.getElementById('game-logo')

  gameLogo.addEventListener('click', () => {
    gameLogo.classList.add('clear')

    window.setTimeout(() => {
      resetMainMenu()
      reloadDanceFloor()
      singlePlayerBox.classList.remove('active')
      multiPlayerBox.classList.remove('active')
      gameLogo.classList.remove('clear')
    }, DELAY_MAIN_MENU)
  })
}

const danceFloor = document.getElementById('dance-floor')
let tripleMatches = []
let tileElsChosen = []
let tilesChosen = []
let turnCount = 0


loadDanceFloor()

function loadDanceFloor() {
  let tileId = 0

  floorTilesArr.sort(() => 0.5 - Math.random())

  for (let tile of floorTilesArr) {
    tileDiv = document.createElement('div')
    tileDiv.classList.add('floor-tile')
    tileDiv.setAttribute('tile-id', tileId)
    tileId++
    tileDiv.addEventListener('click', lightUpTile)
    danceFloor.appendChild(tileDiv)

    if (tile.color === 'wild') {
      tileDiv.tileId = 'wild-tile'
      tileDiv.id = 'wild-tile'
    }
  }
}

function clearDanceFloor() {
  danceFloor.innerHTML = ''
}

function lightUpTile(e) {
  let tileEl = e.target
  let tileId = e.target.getAttribute('tile-id')
  tilesChosen.push(floorTilesArr[tileId])
  tileElsChosen.push(tileEl)
  tileEl.classList.add('selected')
  tileEl.classList.add(floorTilesArr[tileId].color)

  removeTileSelect(tileEl)
  showPickCountInFeed()
  checkTurnLength()
}

function removeTileSelect(tileEl) {
  if (tileEl.classList.contains('selected')) {
    tileEl.removeEventListener('click', lightUpTile)
  }
}

function showPickCountInFeed() {
  if (tripleMatches.length !== 8 && tilesChosen.length === 0) {
    newsFeed.innerText = '3 picks remaining'
  } else if (tilesChosen.length === 1) {
    newsFeed.innerText = '2 picks remaining'
  } else if (tilesChosen.length === 2) {
    newsFeed.innerText = '1 picks remaining'
  }
}

function checkTurnLength() {
  if (tilesChosen.length === 3) {
    updateSinglePlayerScore()
    validateTurn(tileElsChosen, tilesChosen)
  }
}

function updateSinglePlayerScore() {
  turnCount++
  document.getElementById('turn-count').innerText = turnCount
}

function validateTurn(tileElsChosen, tilesChosen) {
  const t1 = tileElsChosen[0]
  const t2 = tileElsChosen[1]
  const t3 = tileElsChosen[2]
  let tilesMatch = tilesChosen[0].color === tilesChosen[1].color
    && tilesChosen[1].color === tilesChosen[2].color

  if (tilesMatch) {
    updateNewsFeed('You found a match!')
    updateMultiPlayerScore()
    window.setTimeout(() => {
      t1.classList.add('matching')
      t2.classList.add('matching')
      t3.classList.add('matching')
    }, DELAY_ACTIVE_MATCHING)
    tripleMatches.push(tilesChosen)
  } else {
    t1.addEventListener('click', lightUpTile)
    t2.addEventListener('click', lightUpTile)
    t3.addEventListener('click', lightUpTile)
    resetCurrentTileSelection(tilesChosen, t1, t2, t3)
    updateNewsFeed('Try again')
    changeActivePlayer()
  }

  checkGameWon(tileElsChosen)
}

const p1 = document.getElementById('player-one')
const p2 = document.getElementById('player-two')

function changeActivePlayer() {
  if (p1.classList.contains('active')) {
    swapToPlayerTwo()
  } else if (p2.classList.contains('active')) {
    swapToPlayerOne()
  }
}

function swapToPlayerOne() {
  p2.classList.remove('active')
  p2ScoreEl.classList.remove('active')
  p1.classList.add('active')
  p1ScoreEl.classList.add('active')
}

function swapToPlayerTwo() {
  p1.classList.remove('active')
  p1ScoreEl.classList.remove('active')
  p2.classList.add('active')
  p2ScoreEl.classList.add('active')
}

function updateMultiPlayerScore() {
  if (p1.classList.contains('active')) {
    p1Points++;
    p1ScoreEl.innerText = p1Points
  } else if (p2.classList.contains('active')) {
    p2Points++;
    p2ScoreEl.innerText = p2Points
  }
}

function resetPlayerPoints() {
  p1Points = 0;
  p1ScoreEl.innerText = p1Points;
  p2Points = 0;
  p2ScoreEl.innerText = p2Points;
  congratsText.classList.remove('text-red')
  congratsText.classList.remove('text-green')
}

function resetCurrentTileSelection(tilesChosen, t1, t2, t3) {
  window.setTimeout(() => {
    t1.classList.remove('selected')
    t1.classList.remove(tilesChosen[0].color)
    t2.classList.remove('selected')
    t2.classList.remove(tilesChosen[1].color)
    t3.classList.remove('selected')
    t3.classList.remove(tilesChosen[2].color)
  }, DELAY_TURN_CHOICES)
}

let newsFeed = document.getElementById('news-feed')

function updateNewsFeed(feedMessage) {
    newsFeed.innerText = feedMessage

    window.setTimeout(() => {
      showPickCountInFeed()
    }, DELAY_TURN_CHOICES)
}

function checkGameWon() {
  if (tripleMatches.length === 8) {
    showWildTile()

    if (singlePlayerBox.classList.contains('active')) {
      showSinglePlayerScore()
    }
    if (multiPlayerBox.classList.contains('active')) {
      showMultiPlayerScore()
    }

    window.setTimeout(() => {
      showWinOverlay()
    }, DELAY_MAIN_MENU)
  }

  tileElsChosen = []
  tilesChosen = []
}

function showWildTile() {
  window.setTimeout(() => {
    document.getElementById('wild-tile').classList.add('wild')
  }, DELAY_ACTIVE_MATCHING)
}

const winOverlay = document.getElementById('win-overlay')
const playAgainBtn = document.getElementById('play-again-btn')
const mainMenuBtn = document.getElementById('main-menu-btn')
const congratsText = document.getElementById('congrats')
const winnerText = document.getElementById('winner-text')

function showWinOverlay() {
  winOverlay.classList.add('active')

  playAgainBtn.addEventListener('click', () => {
    window.setTimeout(() => {
      reloadDanceFloor()
      winOverlay.classList.remove('active')
    }, DELAY_MAIN_MENU)
  })

  mainMenuBtn.addEventListener('click', () => {
    mainMenuBtn.classList.add('clicked')

    window.setTimeout(() => {
      winOverlay.classList.remove('active')
      singlePlayerBox.classList.remove('active')
      multiPlayerBox.classList.remove('active')
      reloadDanceFloor()
      resetMainMenu()
      mainMenuBtn.classList.remove('clicked')
    }, DELAY_MAIN_MENU)
  })
}

function showSinglePlayerScore() {
  congratsText.classList.add('text-cyan')
  winnerText.innerText = 'You won in ' + turnCount + ' turns!'
}

function showMultiPlayerScore() {
  if (p1Points > p2Points) {
    congratsText.classList.add('text-red')
    winnerText.innerText = 'Player One wins!'
  } else if (p1Points < p2Points) {
    congratsText.classList.add('text-green')
    winnerText.innerText = 'Player Two wins!'
  } else {
    congratsText.innerText = 'Tie game'
    winnerText.innerText = "You'll have to play again!"
  }
}

function reloadDanceFloor() {
  clearDanceFloor()
  loadDanceFloor()
  resetPlayerPoints()
  tripleMatches = []
  tileElsChosen = []
  tilesChosen = []
  turnCount = 0
  document.getElementById('turn-count').innerText = 0
  showPickCountInFeed()
  swapToPlayerOne()
  congratsText.innerText = 'Congrats'
}
