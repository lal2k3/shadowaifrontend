import { createSlice } from '@reduxjs/toolkit';

type CveMapsState = {
  mapId: string
}

const initialState: CveMapsState = {
  mapId: 'default'
};

const cveMaps = createSlice({
  name: 'cveMaps',
  initialState,
  reducers: {
    setMapId(state, action) {
      state.mapId = action.payload;
    }
  }
});

export default cveMaps.reducer;

export const { setMapId } = cveMaps.actions;
