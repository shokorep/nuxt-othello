<template>
  <div>
    <!-- <div v-if='error.statusCode === 2000'> -->
      他のユーザーがプレイ中です。しばらくお待ちください。
    <!-- </div> -->
  </div>
</template>

<script>
export default {
  // data () {},
  component: {
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
