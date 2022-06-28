import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

export const editProduct = createAsyncThunk('editProduct/editProduct', async ({userToken,productId,formData},{rejectWithValue}) => {
    
    const config = {
        headers: { Authorization: `Bearer ${userToken}` }
    };
    try {
        const {data} = await axios.put(`/api/product/${productId}/edit`,formData,config);
        return data;
      } catch (error) {
        return rejectWithValue(error.response.data);
    }
    
});

const editProductSlice = createSlice({
    name:"editProduct",
    initialState:{
        isError:false,
        isLoading:false,
        isSuccess:false
    },
    reducers:{
        reset:(state) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = false;
        }
    },
    extraReducers:(build) => {
        build.addCase(editProduct.pending , (state,action) => {
            state.isLoading = true;
        })
        .addCase(editProduct.fulfilled , (state,{payload}) => {
            state.isLoading = false;
            state.product = payload ;
            state.isSuccess = true;
        })
        .addCase(editProduct.rejected , (state,action) => {
            state.isError = true;
            state.isLoading = false;
            state.isSuccess = false;
        })
    }
});

export const { reset } = editProductSlice.actions;
export default editProductSlice.reducer;