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
      layout: [{"w":6,"h":5,"x":0,"y":5,"i":"rider-stats-1","minW":4,"minH":4,"moved":false,"static":false},{"w":12,"h":5,"x":7,"y":0,"i":"rider-milestones-2","minW":8,"minH":5,"moved":false,"static":false},{"w":7,"h":5,"x":0,"y":0,"i":"rider-profile-3","minW":7,"minH":5,"moved":false,"static":false},{"w":9,"h":10,"x":28,"y":0,"i":"career-timeline-4","minW":9,"minH":7,"moved":false,"static":false},{"w":9,"h":5,"x":19,"y":0,"i":"next-event-6","minW":9,"minH":4,"maxH":6,"moved":false,"static":false},{"w":22,"h":8,"x":6,"y":14,"i":"rider-season-history-rider1-7","minW":10,"minH":8,"moved":false,"static":false},{"w":12,"h":9,"x":16,"y":5,"i":"circuit-info-3e3dfeb5-1f48-4ab7-8148-345be8d08a63-7","minW":7,"minH":5,"moved":false,"static":false},{"w":9,"h":8,"x":28,"y":10,"i":"circuit-description-3e3dfeb5-1f48-4ab7-8148-345be8d08a63-8","minW":4,"minH":2,"moved":false,"static":false},{"w":10,"h":9,"x":6,"y":5,"i":"driver-comparison-9","minW":9,"maxW":12,"minH":9,"maxH":12,"moved":false,"static":false},{"w":37,"h":15,"x":0,"y":22,"i":"championship-standings-10","minW":17,"minH":5,"moved":false,"static":false}],
    },
    reducers: {
      setDashLayout: (state, action) => {
        state.layout = action.payload;
      },
    },
});

export const { setDashLayout } = dashboardSlice.actions;

const languageSlice = createSlice({
  name: 'language',
  initialState: { value: 'en' },
  reducers: {
    toggleLanguage: (state) => {
      state.value = state.value === 'en' ? 'fr' : 'en';
    },
    setLanguage: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { toggleLanguage, setLanguage } = languageSlice.actions;

const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    dashboard: dashboardSlice.reducer,
    language: languageSlice.reducer,
  },
});

export default store;
