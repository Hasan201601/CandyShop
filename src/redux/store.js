import { configureStore } from "@reduxjs/toolkit";
import persistCombineReducers from "redux-persist/es/persistCombineReducers";
import cartReducer from "../redux/CartSlice"
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { combineReducers } from "redux"


const persistConfig = {
    key: 'root',
    storage,
};
const reducers = combineReducers({
    cart: cartReducer
})

const persistedReducer = persistReducer(persistConfig, reducers);


const store = configureStore({
    reducer: persistedReducer
})
export default store;