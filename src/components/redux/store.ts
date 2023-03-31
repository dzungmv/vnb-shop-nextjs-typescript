import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
// import storage from "redux-persist/lib/storage";
import createWebStorage from "redux-persist/es/storage/createWebStorage";


import userSlice from "./user/userSlice";


const reducers = combineReducers({
    user: userSlice
})

const createNoopStorage = () => {
    return {
        getItem: (_key: any) => Promise.resolve(null),
        setItem: (_key: any, value: any) => Promise.resolve(value),
        removeItem: (_key: any) => Promise.resolve(),
    }
}

const storage = typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage()
createNoopStorage();

const persistConfig = {
    key: 'root',
    storage: storage,
}

const persistedReducer = persistReducer(persistConfig, reducers)


export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})

export type RootState = ReturnType<typeof store.getState>


export const persistor = persistStore(store)