import { configureStore,applyMiddleware, getDefaultMiddleware } from "@reduxjs/toolkit";
import { rootReducer } from "./slice";
import createSagaMiddleware from 'redux-saga'
import mySaga from './saga/mySaga'
const sagaMiddleware =  createSagaMiddleware()

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware)
})

sagaMiddleware.run(mySaga)

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch