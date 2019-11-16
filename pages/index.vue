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
  data() {
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
    onClickCell(x, y) {
      debugger
      this.board = JSON.parse(JSON.stringify(this.board))
      const { board, turn } = this
      console.log("===========")
      console.log("x, y" + x, y)
      console.log("board[y][x]" + board[y][x])
      console.log("board[y][x - 1]" + board[y][x - 1])
      console.log("turn" + turn)
      // if (x <= 7 && x >= 0 && y <= 7 && y >= 0) {
      const result = this.checkExistMyStoneOnLeft(x - 1, y)
      if (
        board[y][x] === 0 &&
        board[y][x - 1] !== turn &&
        board[y][x - 1] !== 0 &&
        result
      ) {
        console.log("turn" + turn)
        console.log("board[y][x]" + board[y][x])
        board[y][x] = turn
        console.log("turn" + turn)
        console.log("board[y][x]" + board[y][x])
        console.log("白マスかつ左隣が相手色なので置けたよ")
        if (result) {
          this.turnStone(x - 1, y)
        } else {
          console.log("ひっくり返せないよ！")
        }
        if (turn === 1) {
          this.turn = -1
        } else {
          this.turn = 1
        }
      } else if (
        board[y][x] === 0 &&
        board[y][x + 1] !== turn &&
        board[x + 1][y] !== 0
      ) {
        board[y][x] = turn
        console.log("白マスかつ右隣が相手色なので置けたよ")
      } else if (
        board[y][x] === 0 &&
        board[y - 1][x] !== turn &&
        board[y - 1][x] !== 0
      ) {
        board[y][x] = turn
        console.log("白マスかつ上が相手色なので置けたよ")
      } else if (
        board[y][x] === 0 &&
        board[y + 1][x] !== turn &&
        board[y + 1][x] !== 0
      ) {
        board[y][x] = turn
        console.log("白マスかつ下が相手色なので置けたよ")
      } else if (
        board[y][x] === 0 &&
        board[y + 1][x + 1] !== turn &&
        board[y + 1][x + 1] !== 0
      ) {
        board[y][x] = turn
        console.log("白マスかつ右斜め下が相手色なので置けたよ")
      } else if (
        board[y][x] === 0 &&
        board[y + 1][x - 1] !== turn &&
        board[y + 1][x - 1] !== 0
      ) {
        board[y][x] = turn
        console.log("白マスかつ左斜め下が相手色なので置けたよ")
      } else if (
        board[y][x] === 0 &&
        board[y - 1][x + 1] !== turn &&
        board[y - 1][x + 1] !== 0
      ) {
        board[y][x] = turn
        console.log("白マスかつ右斜め上が相手色なので置けたよ")
      } else if (
        board[y][x] === 0 &&
        board[y - 1][x - 1] !== turn &&
        board[y - 1][x - 1] !== 0
      ) {
        board[y][x] = turn
        console.log("白マスかつ左斜め上が相手色なので置けたよ")
      }
      // }
    },
    checkExistMyStoneOnLeft(x, y) {
      const { board, turn } = this
      if (x < 1 && x > 8 && y < 1 && y > 8) {
        if (x < 1) {
          console.log("xが" + x + "なのでfalseを返します")
          console.log("yが" + y + "なのでfalseを返します")
          return false
        } else if (board[y][x - 1] === turn) {
          console.log(
            "board[y][x - 1]が自陣なのでtrueを返します。" + "x=" + x + "y=" + y
          )
          return true
        } else {
          console.log(x - 1, y + "は敵陣なので" + x - 2, y + "を調べます。")
          return this.checkExistMyStoneOnLeft(x - 1, y)
        }
      }
    },
    checkExistMyStoneOnRight(x, y) {
      const { board, turn } = this
      if (x < 1) {
        console.log("xが1なのでfalseを返します")
        return false
      } else if (board[y][x - 1] === turn) {
        console.log(
          "board[y][x - 1]が自陣なのでtrueを返します。" + "x=" + x + "y=" + y
        )
        return true
      } else {
        console.log(x - 1, y + "は敵陣なので" + x - 2, y + "を調べます。")
        return this.checkExistMyStoneOnLeft(x - 1, y)
      }
    },
    turnStone(x, y) {
      this.board = JSON.parse(JSON.stringify(this.board))
      const { board, turn } = this
      if (board[y][x] !== turn) {
        board[y][x] = turn
        this.turnStone(x - 1, y)
      } else if (board[y][x] === turn) {
        console.log("ひっくり返し終了")
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
