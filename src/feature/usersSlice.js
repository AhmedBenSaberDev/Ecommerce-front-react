import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

export const getUsersList = createAsyncThunk('users/getUsersList',async (userToken,{rejectWithValue}) => {
    
    const config = {
        headers: { Authorization: `Bearer ${userToken}` }
    };

    try {
        const {data} = await axios.get('/api/users',config);
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const deleteUser = createAsyncThunk('users/deleteUser',async ({userToken,userId},{rejectWithValue , getState}) => {
    const config = {
        headers: { Authorization: `Bearer ${userToken}` }
    };

    try {
        const {data} = await axios.delete(`/api/users/${userId}`,config);
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

const adminSlice = createSlice({
    name:"users",
    initialState:{
        usersList:[],
        isSuccess:false,
        isLoading:false,
        isError:false
    },
    extraReducers : (builder) => {
        builder.addCase(getUsersList.fulfilled,(state,{payload}) => {
            state.usersList = payload;
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
        })
        .addCase(getUsersList.rejected,(state,{payload}) => {
            state.usersList = payload;
            state.isLoading = false;
            state.isSuccess = false;
        })
        .addCase(getUsersList.pending,(state,{payload}) => {
            state.isLoading = true;
            state.usersList = payload;
        })
        // delete User
        .addCase(deleteUser.fulfilled,(state,{payload}) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
        })
        .addCase(deleteUser.rejected,(state,{payload}) => {
            state.usersList = payload;
            state.isLoading = false;
            state.isSuccess = false;
        })
        .addCase(deleteUser.pending,(state,{payload}) => {
            state.isLoading = true;
            state.usersList = payload;
            state.isSuccess = false;
            state.isError = false;
        })
    }
});

export default adminSlice.reducer;