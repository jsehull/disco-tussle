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

    // floorTile.addEventListener('click', lightUpTile(i))
    floorTile.addEventListener('click', lightUpTile(i))
    // FIXME unable to access floorTilesArr[i].color

    danceFloor.appendChild(floorTile)
  }

}

function lightUpTile(i) {
  const tileId = this.getAttribute('tile-id')
  // console.log('floorTile now', floorTile`[${i}]`)
  // let tileId = floorTile[`${i}`].getAttribute('tile-id')
  console.log('tile ID', tileId)

  tilesChosen.push(floorTilesArr[tileId].color)
  // console.log(tilesChosen)
  console.log('color', floorTilesArr[tileId].color)

  // floorTile.classList.add(floorTilesArr[i].color)
  floorTile.classList.add(floorTilesArr[tileId].color)

  validateTiles()
}

function validateTiles() {
  if (tilesChosen.length === 3) {
    if (tilesChosen[0] === tilesChosen[1] && tilesChosen[1] === tilesChosen[2]) {
      console.log('POINTS!')
    } else if (tilesChosen.includes('wild')) {
      console.log('Bonus try!')
    } else {
      console.log('sorry, end of turn')
    }
  }
}