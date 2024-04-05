import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'users',
    initialState: {
        isAuth: false,
        token: '',
        data: {},
    },

    reducers: {
        login(state, actions) {
            // console.log(actions.payload)
            return {
                ...state,
                isAuth: true,
                token: actions.payload,
            };
        },

        logout(state) {
            // console.log(actions.payload)
            return {
                ...state,
                isAuth: false,
                token: '',
            };
        },

        addUsers(state, actions) {
            return {
                ...state,
                data: actions.payload,
            };
        },

        tokenExpired(state) {
            return {
                ...state,
                isAuth: false,
                token: '',
            };
        },
    },
});

export const { login, logout, addUsers, tokenExpired } = userSlice.actions;
export default userSlice.reducer;
