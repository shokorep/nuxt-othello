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
// import localforage from 'localforage'

export default {
  data () {
    return {
      turn: ''
    }
  },
  async asyncData ({ app, $axios }) {
    console.log({ app })
    // let token = null
    // console.log({ token })
    // console.log('setItem')
    // const aaa = await localforage.setItem('token', 'some value')
    // console.log({ aaa })
    // if (aaa) {
    //   console.log('getItem')
    //   token = await localforage.getItem('token')
    // }
    // console.log({ token })
    // if (token) {
    const auth = await $axios.$get('http://localhost:3000/api/auth')
    const board = await $axios.$get('http://localhost:3000/api/board')
    console.log({ auth }, { board })
    return { auth, board }
    // }
  },
  conputed: {
  },
  created () {
    setInterval(this.getBoard, 1000)
  },
  mounted () {
    if (this.auth.response != null) {
      console.log('aaaaaagdklkala')
      this.turn = this.auth.response.turn
    } else {
      throw new Error('aaaa')
    }
  },
  methods: {
    async onClickCell (x, y) {
      const modify = { x, y, turn: this.turn }
      const res = await this.$axios.$put('http://localhost:3000/api/board', modify).catch(err => console.log(err))
      console.log('res.board:', res.board)
      this.board = res.board
    },
    async getBoard () {
      const board = await this.$axios.$get('http://localhost:3000/api/board')
      this.board = board
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
