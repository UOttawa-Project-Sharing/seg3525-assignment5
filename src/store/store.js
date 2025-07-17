import { configureStore, createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
});

export const { increment } = counterSlice.actions;

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState: {
      layout: [
        { i: '1', x: 0, y: 0, w: 2, h: 2 },
        { i: '2', x: 2, y: 0, w: 2, h: 2 },
      ]
    },
    reducers: {
      setDashLayout: (state, action) => {
        state.layout = action.payload;
      },
    },
});

export const { setDashLayout } = dashboardSlice.actions;

const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    dashboard: dashboardSlice.reducer,
  },
});

export default store;
