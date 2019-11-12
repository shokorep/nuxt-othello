<template>
  <div class="board">
    <template v-for="y in board.length">
      <div v-for="x in board[y - 1].length" :key="`${x} - ${y}`" @click="onClickCell(x - 1, y - 1)" class="cell">
        <div
          v-if="board[y - 1][x - 1]"
          :class="[ 'stone' , board[y - 1][x - 1] === 1 ? 'black' : 'white']"
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
      turn: 1
    }
  },
  methods: {
    onClickCell (x, y) {
      this.board = JSON.parse(JSON.stringify(this.board))
      const { board, turn } = this
      // console.log('===========')
      // console.log(x, y)
      // console.log(board[x - 1][y])
      // console.log(turn)
      if (board[x][y] === 0 && board[x - 1][y] !== turn && board[x - 1][y] !== 0) {
        board[y][x] = turn
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
  margin:20px auto;
}
.cell{
  width: 12.5%;
  height: 12.5%;
  border:1px solid #222;
  float: left;
}
.stone{
  width:80%;
  height:80%;
  border-radius: 50%;
  margin: 10%
}
.black{
  background: #222
}
.white{
  background:white
}
</style>
