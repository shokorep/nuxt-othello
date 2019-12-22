// ストアを作成
export const state = () => ({
  count: 0
  // turn: 1
})

export const mutations = {
  // カウントアップするミューテーションを登録
  increment (state) {
    state.count++
  }
  // changeTune (state) {
  //   state.turn = state.turn * (-1)
  // }
}
