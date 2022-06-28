import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../feature/product.slice";
import singleProductReducer from "../feature/singleProductSlice";
import CartReducer from "../feature/Cart.Slice";
import userReducer from "../feature/userSlice";
import usersReducer from "../feature/usersSlice";
import userInfoReducer from "../feature/userInfoSlice";
import adminProductReducer from "../feature/adminProductSlice";
import adminCreateProductReducer from "../feature/adminCreateProductSlice";
import orderReducer from "../feature/orderSlice";
import editProductReducer from "../feature/editProductSlice";
import addReviewReducer from "../feature/addReviewSlice";

export default configureStore({
    reducer:{
        products:productReducer,
        singleProduct:singleProductReducer,
        cart:CartReducer,
        user:userReducer,
        users:usersReducer,
        userInfo:userInfoReducer,
        adminProducts:adminProductReducer,
        createProduct:adminCreateProductReducer,
        order:orderReducer,
        editProduct:editProductReducer,
        addReview:addReviewReducer
    }
});