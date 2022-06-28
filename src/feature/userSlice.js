import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

const userInfoFromStrorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

export const login = createAsyncThunk('user/login',async (userData,{rejectWithValue}) => {
    try {
        const {data} = await axios.post('/api/login',userData);
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const register = createAsyncThunk('user/register',async (userData,{rejectWithValue}) => {
    try {
        const {data} = await axios.post('/api/register',userData);
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

const userSlice = createSlice({
    name:"user",
    initialState:{
        user:userInfoFromStrorage,
        isLoading:false,
        isSuccess:false,
        isError:false,
        registerSuccess:false,
        registerError:false,
        registerLoading:false
    },
    reducers:{
        registerReset : (state) => {
            state.registerSuccess = false;
            state.registerError = false;
            state.registerLoading = false;
        },
        reset:(state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
        },
        logout:(state,action) => {
            state.user = null;
            localStorage.removeItem('userInfo');
        }
    },
    extraReducers:(builder) => {
        builder.addCase(login.pending,(state,action) => {
          state.isLoading = true;
        })
        .addCase(login.fulfilled,(state,{payload}) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.isError = false;
          state.user = payload;
          localStorage.setItem('userInfo',JSON.stringify(payload));
        })
        .addCase(login.rejected,(state,{payload}) => {
          state.isError = payload.message;
          state.isLoading = false;
          state.isSuccess = false;
        })

        // register
        .addCase(register.pending,(state,action) => {
            state.registerLoading = true;
        })
        .addCase(register.fulfilled,(state,{payload}) => {
          state.registerLoading = false;
          state.registerSuccess = true;
          state.registerError = false;
        })
        .addCase(register.rejected,(state,{payload}) => {
          state.registerError = payload.message;
          state.registerLoading = false;
          state.registerSuccess = false;
        })
}});

export const { logout , reset , registerReset } =  userSlice.actions;
export default userSlice.reducer;