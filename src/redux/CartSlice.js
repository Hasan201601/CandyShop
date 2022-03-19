import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const initialState = {
    cartItems: [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {

            const existingIndex = state.cartItems.findIndex((item) => item.id === action.payload.id)
            if (existingIndex >= 0) {
                if (action.payload.addedQuantity) {
                    state.cartItems[existingIndex] = {
                        ...state.cartItems[existingIndex],
                        cartQuantity: action.payload.addedQuantity + state.cartItems[existingIndex].cartQuantity - 1

                    };
                    action.payload.addedQuantity = 1
                }
                state.cartItems[existingIndex] = {
                    ...state.cartItems[existingIndex],
                    cartQuantity: state.cartItems[existingIndex].cartQuantity + 1
                };
                toast.info(`Increased Product quantity`, {
                    position: "bottom-left",
                    autoClose: 1500
                });
            } else {
                if (action.payload.addedQuantity) {
                    let tempProductItem = {
                        ...action.payload, cartQuantity: action.payload.addedQuantity
                    }
                    state.cartItems.push(tempProductItem);
                    return
                }
                let tempProductItem = {
                    ...action.payload, cartQuantity: 1
                }
                state.cartItems.push(tempProductItem);
                toast.info("Product added to cart", {
                    position: "bottom-left",
                    autoClose: 1500
                })
            }
        },
        decreaseFromCart: (state, action) => {
            const itemIndex = state.cartItems.findIndex(item => item.id === action.payload.id)
            if (state.cartItems[itemIndex].cartQuantity > 1) {
                state.cartItems[itemIndex].cartQuantity -= 1;
                toast.info("Decreased product quantity", {
                    position: "bottom-left",
                    autoClose: 1500,
                });
            } else if (state.cartItems[itemIndex].cartQuantity === 1) {
                const remainingCartItems = state.cartItems.filter(item => item.id !== action.payload.id);
                state.cartItems = remainingCartItems;
                toast.error("Product removed from cart", {
                    position: "bottom-left",
                    autoClose: 1500,
                });
            }
        },
        removeFromCart: (state, action) => {
            state.cartItems.map((cartItem) => {
                if (cartItem.id === action.payload.id) {
                    const remainingItems = state.cartItems.filter(
                        (item) => item.id !== cartItem.id
                    );

                    state.cartItems = remainingItems;

                    toast.error("Product removed from cart", {
                        position: "bottom-left",
                        autoClose: 1500,
                    });
                }
                return state;
            })
        },
        getTotals: (state, action) => {
            let { total, quantity } = state.cartItems.reduce(
                (cartTotal, cartItem) => {
                    const { price, cartQuantity } = cartItem;
                    const itemTotal = price * cartQuantity;

                    cartTotal.total += itemTotal;
                    cartTotal.quantity += cartQuantity
                    return cartTotal
                },
                {
                    total: 0,
                    quantity: 0
                }
            );
            total = parseFloat(total.toFixed(2));
            state.cartTotalAmount = total;
            state.cartTotalQuantity = quantity;
        }
        ,
        clearCart: (state, action) => {
            state.cartItems = [];
            toast.error("Cart Cleared", {
                position: "bottom-left",
                autoClose: 1500
            })
        }
    }
})

export const { addToCart, getTotals, decreaseFromCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;