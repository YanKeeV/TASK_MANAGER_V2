import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import projectReducer from './slices/projectsSlice';
import taskReducer from './slices/taskSlice';
import userReducer from './slices/userSlice';
import { apiSlice } from './slices/apiSlice';
import teamReducer from './slices/teamsSlice'
const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    project: projectReducer,
    team: teamReducer,
    task:taskReducer,
    certainUser:userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;