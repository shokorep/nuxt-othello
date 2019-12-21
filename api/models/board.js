const api = require("express").Router();


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

api.get('/', (req, res) => {
    res.json(board)
})

api.put('/', (req, res, next) => {
    const param = { "bodyの値": req.body };
    console.log(req.body)
    
    
    if (req.body.turn)
    // res.header('Content-Type', 'application/json; charset=utf-8')
    // res.send(param);
    // res.json(board)

    res.send('req');
})


module.exports = api