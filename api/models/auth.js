
const api = require("express").Router();

const users = [
    {
        playername: 'playler1', token: null, turn: 1, exist: false  
    },
    {
        playername: 'playler2', token: null, turn: -1, exist: false
    }
]

api.get('/', function (req, res) {
    let response = null
    for (let i = 0; i < users.length; i++) {
        if(!users[i].exist) {
            users[i].token = Math.random().toString(36).slice(-8)
            users[i].exist = true
            response = users[i]
            break
        }
    }
    res.json({ response, users });
    // res.json(response);
})

module.exports = api
