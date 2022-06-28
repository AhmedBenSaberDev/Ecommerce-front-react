import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getProducts = createAsyncThunk('products/getProducts', async (arg,{rejectWithValue}) => {
  try {
    const {data} = await axios.get('/api/products');
    return data.products;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const productSlice = createSlice({
  name: "products",
  initialState: {
    products: null,
    productDetails:null,
    isLoading:false,
    isSuccess:false,
    isError:false
  },
  reducers:{
    reset:(state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;  
    }
  },
  extraReducers:(builder) => {
    builder.addCase(getProducts.pending,(state,action) => {
      state.isLoading = true;
    })
    .addCase(getProducts.fulfilled,(state,{payload}) => {
      state.isLoading = false;
      state.products = payload ;
    })
    .addCase(getProducts.rejected,(state,action) => {
      state.isError = true;
      state.isLoading = false;
      state.isSuccess = false;
    })
  }
});

export const { reset } = productSlice.actions;
export default productSlice.reducer;
