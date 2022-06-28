import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getUserInfo = createAsyncThunk('user-info/getUserInfo',async ({userToken,id},{ rejectWithValue })  => {
    const config = {
        headers: { Authorization: `Bearer ${userToken}` }
    };

    try {
        const {data} = await axios.get(`/api/profile/${id}`,config);
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const updateUser = createAsyncThunk('user-info/updateUser',async ({userToken,id,userData},{ rejectWithValue })  => {
    const config = {
        headers: { Authorization: `Bearer ${userToken}` }
    };

    try {
        const {data} = await axios.put(`/api/update_user/${id}`,userData,config);
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

const userInfoSlice = createSlice({
    name:'user-info',
    initialState:{
        userInfo:null,
        isLoading:false,
        isSuccess:false,
        isError:false,
        updateSuccess:false,
        updateError:false,
        updateLoading:false
    },
    reducers:{
        reset:(state) => {
            state.updateLoading = false
            state.updateSuccess = false
            state.updateError = false
        }
    },
    extraReducers:(builder) => {
        builder.addCase(getUserInfo.pending,(state,{payload}) => {
            state.isLoading = true;
        })
        .addCase(getUserInfo.rejected,(state,{payload}) => {
            state.isError = true;
        })
        .addCase(getUserInfo.fulfilled,(state,{payload}) => {
            state.userInfo = payload;
            state.isLoading = false;
            state.isSuccess = true;
        })
        .addCase(updateUser.pending,(state,{payload}) => {
            state.updateLoading = true;
        })
        .addCase(updateUser.rejected,(state,{payload}) => {
            state.updateError = payload.message;
        })
        .addCase(updateUser.fulfilled,(state,{payload}) => {
            state.updateLoading = false;
            state.updateSuccess = true;
        })
    }
});

export const { reset } = userInfoSlice.actions;
export default userInfoSlice.reducer;