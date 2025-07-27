import { createSlice } from '@reduxjs/toolkit';

type GeneralState = {
  sidemenu: {
    open: boolean
  }
}

const initialState: GeneralState = {
  sidemenu: {
    open: false
  }
};

const general = createSlice({
  name: 'general',
  initialState,
  reducers: {
    setSideMenuOpen(state, action) {
      state.sidemenu.open = action.payload;
    },
  },
});

export default general.reducer;

export const { setSideMenuOpen } = general.actions;
