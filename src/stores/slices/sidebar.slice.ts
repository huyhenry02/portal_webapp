import { createSlice } from '@reduxjs/toolkit';

type IInitState = {
  minimum: boolean;
};

const initialState: IInitState = {
  minimum: false,
};

const changeMinimumSidebar = (state: IInitState) => {
  state.minimum = !state.minimum;
};

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    changeMinimumSidebar,
  },
});

export default sidebarSlice.reducer;
export const sidebarActions = sidebarSlice.actions;
