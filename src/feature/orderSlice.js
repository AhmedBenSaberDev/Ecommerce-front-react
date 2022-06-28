import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchOrder = createAsyncThunk('order/fetchOrder', async ({userToken,orderId},{rejectWithValue}) => {

    const config = {
        headers: { Authorization: `Bearer ${userToken}`}
    };

    try {
        const { data } = await axios.get(`/api/order/${orderId}`,config);
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const payOrder = createAsyncThunk('order/payOrder', async ({userToken,orderId,paymentResult},{rejectWithValue}) => {

    const config = {
        headers: { Authorization: `Bearer ${userToken}`}
    };

    try {
        const { data } = await axios.post(`/api/order/${orderId}/pay`,{userToken,orderId,paymentResult},config);
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const fetchUserOrders = createAsyncThunk('order/fetchUserOrders', async (userToken,{rejectWithValue}) => {

    const config = {
        headers: { Authorization: `Bearer ${userToken}`}
    };

    try {
        const { data } = await axios.get(`/api/user_orders`,config);
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const fetchAllOrders = createAsyncThunk('order/fetchAllOrders', async (userToken,{rejectWithValue}) => {

    const config = {
        headers: { Authorization: `Bearer ${userToken}`}
    };

    try {
        const { data } = await axios.get(`/api/orders`,config);
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
}); 

export const deliverOrder = createAsyncThunk('order/deliverOrder', async ({userToken,orderId},{rejectWithValue}) => {

    const config = {
        headers: { Authorization: `Bearer ${userToken}`}
    };

    try {
        const { data } = await axios.get(`/api/order/${orderId}/deliver`,config);
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
}); 


const orderSlice = createSlice({
    name:'order',
    initialState:{
        allOrders:[],
        userOrders:null,
        order:null,
        isLoading:false,
        isSuccess:false,
        isError:false,
        payIsLoading:false,
        payIsSuccess:false,
        payIsError:false,
        userOrderSuccess:false,
        userOrderLoading:false,
        userOrderError:false,
        allOrdersError:false,
        allOrdersSuccess:false,
        allOrdersLoading:false,
        deliverOrderSuccess:false,
        deliverOrderError:false,
        deliverOrderLoading:false
    },
    reducers:{
        resetDeliver:(state) =>{
            state.deliverOrderSuccess  = false;
            state.deliverOrderError  = false;
            state.deliverOrderLoading  = false;
        },
        fetchorderReset:(state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
        },
        payReset : (state) => {
            state.payIsLoading = false;
            state.payIsSuccess = false;
            state.payIsError = false;;
        } 
    },
    extraReducers:(builder) => {
        builder.addCase(fetchOrder.pending,(state,{payload}) => {
            state.isLoading = true;
        })
        .addCase(fetchOrder.rejected,(state,{payload}) => {
            state.isLoading = false;
            state.isError = true;
        })
        .addCase(fetchOrder.fulfilled,(state,{payload}) => {
            state.order = payload;
            state.isSuccess = true;
            state.isLoading = false;
        })
        // Order pay
        .addCase(payOrder.pending,(state,{payload}) => {
            state.payIsLoading = true;
        })
        .addCase(payOrder.rejected,(state,{payload}) => {
            state.payIsLoading = false;
            state.payIsError = true;
            console.log(payload);
        })
        .addCase(payOrder.fulfilled,(state,{payload}) => {
            state.order = payload;
            state.payIsSuccess = true;
            state.payIsLoading = false;
        })

        // user orders
        .addCase(fetchUserOrders.pending,(state,{payload}) => {
            state.userOrderLoading = true;
        })
        .addCase(fetchUserOrders.rejected,(state,{payload}) => {
            state.userOrderLoading = false;
            state.userOrderError = true;
        })
        .addCase(fetchUserOrders.fulfilled,(state,{payload}) => {
            state.userOrders = payload;
            state.userOrderSuccess = true;
            state.userOrderLoading = false;
        })

        // fetch all orders
        .addCase(fetchAllOrders.pending,(state,{payload}) => {
            state.allOrdersLoading = true;
        })
        .addCase(fetchAllOrders.rejected,(state,{payload}) => {
            state.allOrdersLoading = false;
            state.allOrdersError = true;
        })
        .addCase(fetchAllOrders.fulfilled,(state,{payload}) => {
            state.allOrders = payload;
            state.allOrdersSuccess = true;
            state.allOrdersLoading = false;
        })

        // deliver order
        .addCase(deliverOrder.pending,(state,{payload}) => {
            state.deliverOrderLoading = true;
        })
        .addCase(deliverOrder.rejected,(state,{payload}) => {
            state.deliverOrderLoading = false;
            state.deliverOrderError = true;
        })
        .addCase(deliverOrder.fulfilled,(state,{payload}) => {
            state.deliverOrderSuccess = true;
            state.deliverOrderLoading = false;
        })
    }
});

export const { payReset , fetchorderReset , resetDeliver} = orderSlice.actions;
export default orderSlice.reducer;