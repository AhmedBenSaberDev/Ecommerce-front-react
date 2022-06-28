import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

export const getProductDetails = createAsyncThunk('singleProduct/getProductDetails', async (productId,{rejectWithValue}) => {
    try {    
        const { data } = await axios.get('/api/product/' + productId );
        return data.product;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
});

const singleProductSlice = createSlice({
    name:"singleProduct",
    initialState:{
        product:null,
        isError:false,
        isLoading:false,
        isSuccess:false
    },
    extraReducers:(build) => {
        build.addCase(getProductDetails.pending , (state,action) => {
            state.isLoading = true;
        })
        .addCase(getProductDetails.fulfilled , (state,{payload}) => {
            state.isLoading = false;
            state.product = payload ;
            state.isSuccess = true;
        })
        .addCase(getProductDetails.rejected , (state,action) => {
            state.isError = true;
            state.isLoading = false;
            state.isSuccess = false;
        })
    }
});


export default singleProductSlice.reducer;