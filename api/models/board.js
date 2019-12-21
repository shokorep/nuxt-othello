// import _ from lodash
const api = require("express").Router();

const state = 1

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

const direction= [
  [0, 1],
  [1, 1],
  [1, 0],
  [1, -1],
  [0, -1],
  [-1, -1],
  [-1, 0],
  [-1, 1]
];

// TODO　ひっくりかえすロジック書く
function turnoutStone(x, y) {
    // this.board = JSON.parse(JSON.stringify(this.board))
    // const { board, turn, direction } = this
    // let turnOverCandidate = []
    // const turnOverTerget = []
    // const oppositeTurn = turn * (-1)
    // direction.forEach(function (dir) {
    //     for (let i = 1; i <= 8; i++) {
    //         const trgx = (dir[1] * i) + x
    //         const trgy = (dir[0] * i) + y
    //         if (board[trgy] && board[trgy][trgx] && board[trgy][trgx] === oppositeTurn) {
    //             turnOverCandidate.push([trgy, trgx])
    //         } else if (board[trgy] && board[trgy][trgx] && turnOverCandidate.length >= 1 && board[trgy][trgx] === turn) {
    //             turnOverTerget.push(turnOverCandidate)
    //             turnOverCandidate = []
    //             break
    //         } else if (board[trgy] && (board[trgy][trgx] === 0 || board[trgy][trgx] === turn)) {
    //             turnOverCandidate = []
    //             break
    //         }
    //     }
    // })
    // if (turnOverTerget.length >= 1) {
    //     board[y][x] = turn
    //     turnOverTerget.forEach(function (c) {
    //         c.forEach(function (t) {
    //             board[t[0]][t[1]] = turn
    //         })
    //     })
    //     this.turn = oppositeTurn
    // }
    console.log({x},{y})
    return board
}


api.get('/', (req, res) => {
    res.json(board)
})

api.put('/', (req, res, next) => {
    const param = {
        "result":"Hello "+ req.body + " !",
        board
    };
    
    const x = req.body.x
    const y = req.body.y
    const turn = parseInt(req.body.turn)

    console.log({ x }, { y }, {turn}, {state})
    

    if (turn === state) {
       console.log('aaaaaa')
        const newBoard = turnoutStone(x, y)
       console.log("bbbbbbb");        
       this.state = this.state * -1;
       console.log({state})
       console.log({ newBoard })
    }
    // res.header('Content-Type', 'application/json; charset=utf-8')
    // res.send(param);
    // res.json(board)

    

    res.send(param);
})


module.exports = api