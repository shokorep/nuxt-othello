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
export default {
  data () {
    return {
      board: [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, -1, 0, 0, 0],
        [0, 0, 0, -1, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0]
      ],
      turn: 1,
      direction: [[0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1], [-1, 0], [-1, 1]]
    }
  },
  methods: {
    onClickCell (x, y) {
      this.board = JSON.parse(JSON.stringify(this.board))
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
