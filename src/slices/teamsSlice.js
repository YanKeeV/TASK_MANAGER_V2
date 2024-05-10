import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    teamInfo: localStorage.getItem('teamInfo')
  ? JSON.parse(localStorage.getItem('teamInfo'))
  : null,
}



const teamSlice=createSlice({
  name:'project',
  initialState,
  reducers:{
    setTeam: (state, action) => {
      state.teamInfo = action.payload;
      localStorage.setItem('teamInfo', JSON.stringify(action.payload));
    },
    removeTeam: (state, action) => {
      state.teamInfo = null;
      localStorage.removeItem('teamInfo');
    },
  }
})

export const { setTeam, removeTeam } = teamSlice.actions;
export default teamSlice.reducer;