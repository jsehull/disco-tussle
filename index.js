const floorTilesArr = [
  {
    color: 'red'
  },
  {
    color: 'red'
  },
  {
    color: 'red'
  },
  {
    color: 'cyan'
  },
  {
    color: 'cyan'
  },
  {
    color: 'cyan'
  },
  {
    color: 'green'
  },
  {
    color: 'green'
  },
  {
    color: 'green'
  },
  {
    color: 'orange'
  },
  {
    color: 'orange'
  },
  {
    color: 'orange'
  },
  {
    color: 'pink'
  },
  {
    color: 'pink'
  },
  {
    color: 'pink'
  },
  {
    color: 'purple'
  },
  {
    color: 'purple'
  },
  {
    color: 'purple'
  },
  {
    color: 'yellow'
  },
  {
    color: 'yellow'
  },
  {
    color: 'yellow'
  },
  {
    color: 'blue'
  },
  {
    color: 'blue'
  },
  {
    color: 'blue'
  },
  {
    color: 'wild'
  }
]

const danceFloor = document.getElementById('dance-floor')
let floorTile
let tilesChosen = []

loadDanceFloor()

function loadDanceFloor() {
  for (let i = 0; i < floorTilesArr.length; i++) {
    floorTile = document.createElement('div')
    // console.log('const', floorTile)
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
  console.log('tile clicks')
  console.log(tilesChosen)

  // TODO light up tile on click
  // floorTile.classList.add(floorTilesArr[i].color)
}