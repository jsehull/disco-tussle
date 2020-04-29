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
let tilesChosen = []
let tileElsChosen = []

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

  console.log(tilesChosen)

  if (tilesMatch) {
    resetPicksInFeed('You get one point')
    window.setTimeout(() => {
      tileElOne.classList.add('matching')
      tileElTwo.classList.add('matching')
      tileElThree.classList.add('matching')
    }, 250)
  } else if (tilesChosen.includes('wild')) {
    // FIXME no longer recognizes WILD
    resetPicksInFeed('You get a BONUS turn')
  } else {
    resetPicksInFeed('Try again')
    window.setTimeout(() => {
      tileElOne.classList.remove(tilesChosen[0].color)
      tileElTwo.classList.remove(tilesChosen[1].color)
      tileElThree.classList.remove(tilesChosen[2].color)
    }, 800)
    // changeActivePlayer() // activate for multiplayer
  }
}

let newsFeed = document.getElementById('news-feed')

function showPickCountInFeed() {
  if (tilesChosen.length === 1) {
    newsFeed.innerText = '2 picks remaining'
  } else if (tilesChosen.length === 2) {
    newsFeed.innerText = '1 picks remaining'
  }
}

function resetPicksInFeed(feedMessage) {
    newsFeed.innerText = feedMessage

    window.setTimeout(() => {
      newsFeed.innerText = '3 picks remaining'
    }, 800)
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
