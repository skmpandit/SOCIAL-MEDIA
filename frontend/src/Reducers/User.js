import { createReducer } from "@reduxjs/toolkit"
 
const intitialState = {
    isAuthenticated: false,
} 

export const userReducer = createReducer(intitialState, {
    LoginRequest: (state) => {
        state.loading = true;
    },
    LoginSuccess: (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
    },
    LoginFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
    },

    RegisterRequest: (state) => {
        state.loading = true;
    },
    RegisterSuccess: (state, action) => {
        state.loading = false;
        state.user = action.payload; 
        state.isAuthenticated = true;
    },
    RegisterFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
    },

    LoadUserRequest: (state) => {
        state.loading = true;
    },
    LoadUserSuccess: (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
    },
    LoadUserFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
    },

    logoutUserRequest: (state) => {
        state.loading = true;
    },
    logoutUserSuccess: (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
    },
    logoutUserFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = true;
    },


    clearErrors: (state) => {
        state.error = null;
    }
})


export const postOfFollowingReducer = createReducer(intitialState, {
    postOfFollowingRequest: (state) => {
        state.loading = true;
    },
    postOfFollowingSuccess: (state, action) => {
        state.loading = false;
        state.posts = action.payload;
    },
    postOfFollowingFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    clearErrors: (state) => {
        state.error = null;
    }
})


export const allUsersReducer = createReducer(intitialState, {
    allUsersRequest: (state) => {
        state.loading = true;
    },
    allUsersSuccess: (state,action) => {
        state.loading = false;
        state.users = action.payload;
    },
    allUsersFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    clearErrors: (state) => {
        state.error = null;
    }
})

export const userProfileReducer = createReducer(intitialState, {
    userProfileRequest: (state) => {
        state.loading = true;
    },
    userProfileSuccess: (state, action) => {
        state.loading = false;
        state.user = action.payload;
    },
    userProfileFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    clearErrors: (state) => {
        state.error = null;
    }
})