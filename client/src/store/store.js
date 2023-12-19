import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cart";
import cartUiSlice from "./cartUiSlice";

const store = configureStore({
    reducer: {
        cart: cartSlice.reducer,
        cartUi: cartUiSlice.reducer
    }
})

export default store;