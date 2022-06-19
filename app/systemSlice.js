import { createSlice } from '@reduxjs/toolkit';

const systemSlice = createSlice({
  name: 'system',
  initialState: {
    status: {
      isLoading: false,
      title: '',
    },
  },

  reducers: {
    setIsLoading: (state, { payload }) => {
      state.status.isLoading = payload;
    },
    setTitle: (state, { payload }) => {
      state.status.title = payload;
    },
  },
});

export const { setIsLoading, setTitle } = systemSlice.actions;
export default systemSlice.reducer;
