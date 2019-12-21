<template>
  <div class="board">
    <template v-for="y in board.length">
      <div
        v-for="x in board[y - 1].length"
        :key="`${x} - ${y}`"
        class="cell"
        @click="onClickCell(x - 1, y - 1)"
      >
        <div
          v-if="board[y - 1][x - 1]"
          :class="['stone', board[y - 1][x - 1] === 1 ? 'black' : 'white']"
        />
      </div>
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      turn: 1,
      direction: [[0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1], [-1, 0], [-1, 1]]
      // board: []
    }
  },
  async asyncData ({ app, $axios }) {
    console.log({ app })
    const auth = await $axios.$get('http://localhost:3000/api/auth')
    const board = await $axios.$get('http://localhost:3000/api/board')
    console.log(auth, board)
    return { auth, board }
  },
  // async mounted () {
  //   this.board = await this.initBoard()
  // },
  conputed: {
    ...mapState(['count'])
  },
  methods: {
    // async initBoard () {
    //   await this.$axios.$get(`http://localhost:3000/api/board`)
    //     .then((res) => {
    //       console.log('res.board:', res.board)
    //       return res.board
    //     }).catch(err => alert(err))
    // },
    async onClickCell (x, y) {
      this.board = JSON.parse(JSON.stringify(this.board))
      const modify = { name: 'hoge' }
      // console.log(this.auth, 'その２')
      const user = await this.$axios.$put('http://localhost:3000/api/board', modify).catch(err => console.log(err))
      console.log(user)
      console.log('this.count')
      console.log(this.count)
      const { board, turn, direction } = this
      let turnOverCandidate = []
      const turnOverTerget = []
      const oppositeTurn = turn * (-1)
      direction.forEach(function (dir) {
        for (let i = 1; i <= 8; i++) {
          const trgx = (dir[1] * i) + x
          const trgy = (dir[0] * i) + y
          if (board[trgy] && board[trgy][trgx] && board[trgy][trgx] === oppositeTurn) {
            turnOverCandidate.push([trgy, trgx])
          } else if (board[trgy] && board[trgy][trgx] && turnOverCandidate.length >= 1 && board[trgy][trgx] === turn) {
            turnOverTerget.push(turnOverCandidate)
            turnOverCandidate = []
            break
          } else if (board[trgy] && (board[trgy][trgx] === 0 || board[trgy][trgx] === turn)) {
            turnOverCandidate = []
            break
          }
        }
      })
      if (turnOverTerget.length >= 1) {
        board[y][x] = turn
        turnOverTerget.forEach(function (c) {
          c.forEach(function (t) {
            board[t[0]][t[1]] = turn
          })
        })
        this.turn = oppositeTurn
      }
    }
  }
}
</script>

<style scoped>
.board {
  width: 480px;
  height: 480px;
  background: #090;
  margin: 20px auto;
}
.cell {
  width: 12.5%;
  height: 12.5%;
  border: 1px solid #222;
  float: left;
}
.stone {
  width: 80%;
  height: 80%;
  border-radius: 50%;
  margin: 10%;
}
.black {
  background: #222;
}
.white {
  background: white;
}
</style>
