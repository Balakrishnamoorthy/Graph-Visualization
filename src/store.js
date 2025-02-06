import { configureStore } from '@reduxjs/toolkit';
import graphReducer from './graphSlice';

const store = configureStore({
    devTools:true,//make it false in the production to avoid unwanted hacking data store
    reducer: {
        graph: graphReducer,
    },
});

export default store;
