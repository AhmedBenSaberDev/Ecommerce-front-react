import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const cartItemFromStrorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];
const shippindAddressFromStrorage = localStorage.getItem('shipping') ? JSON.parse(localStorage.getItem('shipping')) : null;


export const addOrder = createAsyncThunk('cart/addOrder', async ({order,userToken},{rejectWithValue}) => {

    const config = {
        headers: { Authorization: `Bearer ${userToken}` }
    };

    try {
        const {data} = await axios.post('/api/orders',order,config);
        return data;
      } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        orderId:null,
        items:cartItemFromStrorage,
        shippingAddress:shippindAddressFromStrorage,
        shippingPrice:50,
        taxPrice:0,
        paymentMethod:"paypal",
        totalPrice : cartItemFromStrorage?.map(i => i.price * i.quantity).reduce((prev,curr) => prev + curr, 0).toFixed(2),
        isLoading:false,
        isError:false,
        isSuccess:false
    },
    reducers: {
        resetItems:(state) => {
            state.items = []
            localStorage.removeItem('cartItems');
        },
        reset:(state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
        },
        addItem : (state,action) => {

            let existingItemIndex;

            const existingItem =  state.items.find((i,index) =>  {
                existingItemIndex = index;
                return i._id === action.payload._id
            });

            if(existingItem){
                state.items[existingItemIndex].quantity = Number(state.items[existingItemIndex].quantity) + Number(action.payload.quantity)       
            }else{
                state.items.push(action.payload);
            }

            state.totalPrice =  parseFloat(state.items.map(i => i.price * i.quantity).reduce((prev,curr) => prev + curr, 0).toFixed(2)) + parseFloat(state.taxPrice) + parseFloat(state.shippingPrice)
            localStorage.setItem('cartItems',JSON.stringify(state.items));
        },
        deleteItem :(state,{payload}) => {
            state.items = state.items.filter(i => i._id != payload);
            localStorage.setItem('cartItems',JSON.stringify(state.items));
        },
        updateItemQuantity : (state,{payload}) => {
            const itemIndex = state.items.findIndex(item => item._id == payload.productId);
            state.items[itemIndex].quantity = payload.quantity;
            localStorage.setItem('cartItems',JSON.stringify(state.items));
            state.totalPrice =  parseFloat(state.items.map(i => i.price * i.quantity).reduce((prev,curr) => prev + curr, 0).toFixed(2)) + parseFloat(state.taxPrice) + parseFloat(state.shippingPrice)
        },
        setShippingAddress: (state,{payload}) => {
            state.shippingAddress = payload;
            localStorage.setItem('shipping',JSON.stringify(payload));
        }
    },
    extraReducers : (builder) => {
        builder.addCase(addOrder.pending,(state,action) => {
            state.isLoading = true;
          })
          .addCase(addOrder.fulfilled,(state,{payload}) => {
            state.orderId = payload._id;
            
            state.isSuccess = true;
            state.isLoading = false;
          })
          .addCase(addOrder.rejected,(state,action) => {
            state.isError = true;
            state.isLoading = false;
            state.isSuccess = false;
          })
    }
  });
  
  export const {resetItems, reset, addItem , deleteItem , updateItemQuantity , setShippingAddress} = cartSlice.actions;
  export default cartSlice.reducer;