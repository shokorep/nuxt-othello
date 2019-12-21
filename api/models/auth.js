
const api = require("express").Router();

const users = [
    {
        playername: 'playler1', token: null, turn: 1, exist: false  
    },
    {
        playername: 'playler2', token: null, turn: -1, exist: false
    }
]
let resonse = null
for (let i = 0; i < users.length; i++) {
    if(!users[i].exist) {
        users[i].token = Math.random().toString(36).slice(-8)
        users[i].exist = true
        resonse = users[i]
    }
    break
}

api.get('', function (req, res) {
    res.json(users);
})

module.exports = api

// module.exports = {
//     get: function (req, res) {
//         res.json(resonse);
//     },
//     post: (req, res) => {

//     }    
// }