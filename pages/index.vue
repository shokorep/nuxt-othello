<template>
  <div>
    <p>あなたは{{ turn === 1 ? '黒' : '白' }}です</p>
    <p>{{ state === 1 ? '黒' : '白' }}のターンです</p>
    <div class="board">
      <template v-for="y in board.length">
        <div
          v-for="x in board[y - 1].length"
          :key="`${x} - ${y}`"
          @click="onClickCell(x - 1, y - 1)"
          class="cell"
        >
          <div
            v-if="board[y - 1][x - 1]"
            :class="['stone', board[y - 1][x - 1] === 1 ? 'black' : 'white']"
          />
        </div>
      </template>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      turn: ''
    }
  },
  async asyncData ({ app, $axios }) {
    const auth = await $axios.$get('/api/auth')
    const res = await $axios.$get('/api/board')
    const board = res.board
    const state = res.state
    return { auth, board, state }
  },
  conputed: {
  },
  created () {
    setInterval(this.getBoard, 1000)
  },
  mounted () {
    if (this.auth.response != null) {
      this.turn = this.auth.response.turn
    } else {
      throw new Error('aaaa')
    }
  },
  methods: {
    async onClickCell (x, y) {
      const modify = { x, y, turn: this.turn }
      const res = await this.$axios.$put('/api/board', modify).catch(err => console.error(err))
      this.board = res.board
    },
    async getBoard () {
      const res = await this.$axios.$get('/api/board')
      this.board = res.board
      this.state = res.state
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
