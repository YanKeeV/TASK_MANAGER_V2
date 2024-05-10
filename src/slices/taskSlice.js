import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  taskInfo: localStorage.getItem('taskInfo')
  ? JSON.parse(localStorage.getItem('taskInfo'))
  : null,
}



const taskSlice=createSlice({
  name:'task',
  initialState,
  reducers:{
    setTask: (state, action) => {
      state.taskInfo = action.payload;
      localStorage.setItem('taskInfo', JSON.stringify(action.payload));
    },
    removeTask: (state, action) => {
      state.taskInfo = null;
      localStorage.removeItem('taskInfo');
    },
  }
})

export const { setTask, removeTask } = taskSlice.actions;
export default taskSlice.reducer;