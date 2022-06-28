import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const createProduct = createAsyncThunk('create_product/createProduct', async ({formData,userToken},{rejectWithValue}) => {
    
    const config = {
        headers: { Authorization: `Bearer ${userToken}` }
    };

    try {
        const {data} = await axios.post('/api/product',formData,config);
        return data;
      } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

const adminProductSlice = createSlice({
    name:"create_product",
    initialState:{
        isLoading:false,
        isSuccess:false,
        isLoading:false
    },
    reducers:{
        reset : (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isLoading = false;
        }
    },
    extraReducers:(builder) => {
        builder.addCase(createProduct.pending , (state,action) => {
            state.isLoading = true;
        })
        .addCase(createProduct.fulfilled , (state,{payload}) => {
            state.isLoading = false;
            state.isSuccess = true;
        })
        .addCase(createProduct.rejected , (state,{payload}) => {
            console.log(payload);
            state.isError = true;
            state.isLoading = false;
            state.isSuccess = false;
        })
    }
});

export const {reset} = adminProductSlice.actions;
export default adminProductSlice.reducer;