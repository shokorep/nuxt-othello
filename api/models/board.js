import _ from 'lodash'

const api = require('express').Router()

// 1が黒、-1が白
let state = 1

let board = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, -1, 0, 0, 0],
  [0, 0, 0, -1, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0]
]

const direction = [
  [0, 1],
  [1, 1],
  [1, 0],
  [1, -1],
  [0, -1],
  [-1, -1],
  [-1, 0],
  [-1, 1]
]

function turnoutStone (x, y, turn) {
  // TODO↓ 両方ともだめ。 何故ならばthis.が使えないから
  // const test = JSON.stringify(this.board)
  // const test = JSON.parse(this.board)
  // console.log({test})

  const turnoutBoard = _.cloneDeep(board)
  let turnOverCandidate = []
  const turnOverTerget = []
  const oppositeTurn = turn * (-1)
  direction.forEach(function (dir) {
    for (let i = 1; i <= 8; i++) {
      const trgx = (dir[1] * i) + x
      const trgy = (dir[0] * i) + y
      if (turnoutBoard[trgy] && turnoutBoard[trgy][trgx] && turnoutBoard[trgy][trgx] === oppositeTurn) {
        turnOverCandidate.push([trgy, trgx])
      } else if (turnoutBoard[trgy] && turnoutBoard[trgy][trgx] && turnOverCandidate.length >= 1 && turnoutBoard[trgy][trgx] === turn) {
        turnOverTerget.push(turnOverCandidate)
        turnOverCandidate = []
        break
      } else if (turnoutBoard[trgy] && (turnoutBoard[trgy][trgx] === 0 || turnoutBoard[trgy][trgx] === turn)) {
        turnOverCandidate = []
        break
      }
    }
  })
  if (turnOverTerget.length >= 1) {
    turnoutBoard[y][x] = turn
    turnOverTerget.forEach(function (c) {
      c.forEach(function (t) {
        turnoutBoard[t[0]][t[1]] = turn
      })
    })
    state = oppositeTurn
    board = turnoutBoard
  }
}

api.get('/', (req, res) => {
  res.json({ board, state })
})

api.put('/', (req, res, next) => {
  const x = parseInt(req.body.x)
  const y = parseInt(req.body.y)
  const turn = parseInt(req.body.turn)

  if (turn === state) {
    try {
      turnoutStone(x, y, turn)
    } catch (e) { console.log({ e }) }
  }

  const param = {
    'result': 'Hello!',
    state,
    board
  }
  res.send(param)
})

module.exports = api
