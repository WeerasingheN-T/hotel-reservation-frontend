import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import authReducer from '../features/auth/authSlice';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';

const persistConfig = {
    key: 'root',
    storage
};

const rootReducer = combineReducers({
    auth : authReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck : false
        }),
});

export const persistor = persistStore(store);