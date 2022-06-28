import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

export const addReview = createAsyncThunk('review/addReview', async ({review,productId,userToken},{rejectWithValue}) => {

    const config = {
        headers: { Authorization: `Bearer ${userToken}` }
    };

    try {
        const {data} = await axios.post(`/api/product/${productId}/review`,review,config);
        console.log(data);
        return data;
      } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const addReviewSlice = createSlice({
    name: "review",
    initialState: {
        reviews:null,
        AddReviewLoading:false,
        AddReviewError:false,
        AddReviewSuccess:false
    },
    reducers: {
        reset:(state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
        }
    },
    extraReducers : (builder) => {
        builder.addCase(addReview.pending,(state,action) => {
            state.addReviewLoading = true;
          })
          .addCase(addReview.fulfilled,(state,{payload}) => {
            state.orderId = payload._id;
            
            state.addReviewSuccess = true;
            state.addReviewLoading = false;
          })
          .addCase(addReview.rejected,(state,action) => {
            state.addReviewError = true;
            state.addReviewLoading = false;
            state.addReviewSuccess = false;
          })
    }
  });
  
  export const {reset} = addReviewSlice.actions;
  export default addReviewSlice.reducer;