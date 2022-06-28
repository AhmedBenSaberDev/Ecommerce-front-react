import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllProducts = createAsyncThunk('admin_product/fetchAllProducts',async({rejectWithValue}) => {

    try {
        const {data} = await axios.get('/api/products');
        return data.products;
      } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const deleteProduct = createAsyncThunk('admin_product/deleteProduct',async({productId,userToken},{rejectWithValue}) => {

    const config = {
        headers: { Authorization: `Bearer ${userToken}` }
    };

    try {
        const {data} = await axios.delete(`/api/product/${productId}`,config);
        console.log(data);
        return data;
      } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

const adminProductSlice = createSlice({
    name:"admin_product",
    initialState:{
        products:[],
        isSuccess:false,
        isError:false,
        isLoading:false,
        deleteLoading:false,
        deleteSuccess:false,
        deleteError:false
    },
    reducers:{
        deleteReset:(state) => {
            state.deleteLoading = false;
            state.deleteSuccess = false;
            state.deleteError = false;        }
    },
    extraReducers:(builder) => {
        builder.addCase(fetchAllProducts.pending,(state,action) => {
            state.isLoading = true;
        })
        .addCase(fetchAllProducts.rejected,(state,action) => {
            state.isError = true;
            state.isSuccess = false;
        })
        .addCase(fetchAllProducts.fulfilled,(state,{payload}) => {
            state.products = payload;
            state.isLoading = false;
            state.isSuccess = true;
        })
        // delete
        .addCase(deleteProduct.pending,(state,action) => {
            state.deleteLoading = true;
        })
        .addCase(deleteProduct.rejected,(state,action) => {
            state.deleteError = true;
            state.deleteSuccess = false;
        })
        .addCase(deleteProduct.fulfilled,(state,{payload}) => {
            state.deleteLoading = false;
            state.deleteSuccess = true;
        })
    }
});


export const { deleteReset } = adminProductSlice.actions;
export default adminProductSlice.reducer;