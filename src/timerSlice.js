import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  length: {
    break: 7,
    session: 5
  }
}

const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    incrementLength(state, action) {
      const type = action.payload
      if (!state.timer.active) {
        state.length[type]++
      }
    },
    decrementLength(state, action) {
      const type = action.payload
      if (!state.timer.active) {
        state.length[type] = Math.max(state.length[type] - 1, 1)
      }
    },
    resetTimer(state) {
      state = Object.assign({}, initialState)
    },
    updateTimer(state, action) {
      state.timer = Object.assign(state, action.payload)
    }
  }
})

export const {
  incrementLength,
  decrementLength,
  resetTimer,
  updateTimer
} = timerSlice.actions

export default timerSlice.reducer

export const selectTimer = state => state.timer
