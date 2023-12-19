import { createSlice } from "@reduxjs/toolkit";

const items = localStorage.getItem('cartItems') !== null ? JSON.parse(localStorage.getItem('cartItems')) : [];
const totalQuantity = localStorage.getItem('totalQuantity') !== null ? JSON.parse(localStorage.getItem('totalQuantity')) : 0;
const totalAmount = localStorage.getItem('totalAmount') !== null ? JSON.parse(localStorage.getItem('totalAmount')) : 0;


const setData = (item, totalQuantity, totalAmount) => {
    localStorage.setItem('cartItems', JSON.stringify(item))
    localStorage.setItem('totalQuantity', JSON.stringify(totalQuantity))
    localStorage.setItem('totalAmount', JSON.stringify(totalAmount))
}


const initialState = {
    cartItem: items,
    totalQuantity: totalQuantity,
    totalAmount: totalAmount,
    allFilterData: []
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,

    reducers: {
        addItem(state, action) {
            const newid = action.payload
            const existingItem = state.cartItem.find((item) => item.id === newid.id);
            state.totalQuantity++;

            if (!existingItem) {
                const { id, title, price, image } = action.payload
                state.cartItem.push({
                    id: id,
                    price: price,
                    title: title,
                    img: image,
                    quantity: 1,
                    totalPrice: newid.price
                });
            }
            else {
                existingItem.quantity++;
                existingItem.totalPrice =
                    Number(existingItem.totalPrice) + Number(newid.price);
            }
            state.totalAmount = state.cartItem.reduce(
                (total, item) => total + Number(item.price) * Number(item.quantity),
                0
            );


            setData(state.cartItem.map((item) => item), state.totalQuantity, state.totalAmount)

        },
        removeItem(state, action) {
            const newItem = action.payload
            const existingItem = state.cartItem.find((state) => state.id === newItem)
            state.totalQuantity--

            if (existingItem.quantity === 1) {
                state.cartItem = state.cartItem.filter((item) => item.id !== newItem)
            } else {
                existingItem.quantity--;
                existingItem.totalPrice =
                    Number(existingItem.totalPrice) - Number(existingItem.price)
            }
            state.totalAmount = state.cartItem.reduce(
                (total, item) => total + Number(item.price) * Number(item.quantity),
                0
            );

            setData(state.cartItem.map((item) => item), state.totalQuantity, state.totalAmount)
        },
        deleteItem(state, action) {
            const id = action.payload
            const existingItem = state.cartItem.find((item) => item.id === id)

            if (existingItem) {
                state.cartItem = state.cartItem.filter((item) => item.id !== id)
                state.totalQuantity = state.totalQuantity - existingItem.quantity
            }
            state.totalAmount = state.cartItem.reduce(
                (total, item) => total + Number(item.price) * Number(item.quantity),
                0
            );

            setData(state.cartItem.map((item) => item), state.totalQuantity, state.totalAmount)
        },
        getFilteredData(state, action) {
            // console.log(action.payload)
            const allData = action.payload
            state.allFilterData = allData
        }
    }
})

export const cartActions = cartSlice.actions
export default cartSlice;