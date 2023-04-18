import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import createWebStorage from "redux-persist/es/storage/createWebStorage";


import userSlice from "./user/userSlice";
import modalSlice from "./modal/modalSlice";


const reducers = combineReducers({
    user: userSlice,
    modal: modalSlice
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
    blacklist: ['modal']
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