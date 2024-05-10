import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  projectInfo: localStorage.getItem('projectInfo')
  ? JSON.parse(localStorage.getItem('projectInfo'))
  : null,
}



const projectSlice=createSlice({
  name:'project',
  initialState,
  reducers:{
    setProject: (state, action) => {
      state.projectInfo = action.payload;
      localStorage.setItem('projectInfo', JSON.stringify(action.payload));
    },
    removeProject: (state, action) => {
      state.projectInfo = null;
      localStorage.removeItem('projectInfo');
    },
  }
})

export const { setProject, removeProject } = projectSlice.actions;
export default projectSlice.reducer;