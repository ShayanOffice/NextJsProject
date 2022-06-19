import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'uzer',
  initialState: {
    auth: {
      accessToken: '',
      refreshToken: '',
    },
    currentUser: {
      Id: '',
      ProvinceId: -1,
      Province: '',
      LOVDepartmentId: -1,
      UserLevelId: 4,
      Password: '',
      Name: '',
      Family: '',
      PhoneNumber: '',
      createAt: '',
      updatedAt: '',
    },
  },

  reducers: {
    setUserAttr: (state, { payload }) => {
      state.currentUser[payload.Attr] = payload.Val;
    },

    login: (state, { payload }) => {
      state.currentUser = payload.User;
      state.auth.accessToken = payload.accessToken;
      state.auth.refreshToken = payload.refreshToken;
    },
    updateAccessToken: (state, { payload }) => {
      state.auth.accessToken = payload.accessToken;
    },
    logout: (state) => {
      state.auth = {
        accessToken: '',
        refreshToken: '',
      };

      state.currentUser = {
        Id: '',
        ProvinceId: -1,
        LOVDepartmentId: -1,
        UserLevelId: 4,
        Password: '',
        Name: '',
        Family: '',
        PhoneNumber: '',
        createAt: '',
        updatedAt: '',
      };
    },
  },
});

export const { logout, setUserAttr, login, updateAccessToken } =
  userSlice.actions;
export default userSlice.reducer;
