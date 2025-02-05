import { configureStore } from '@reduxjs/toolkit';
import graphReducer from './graphSlice';

const store = configureStore({
    devTools:true,
    reducer: {
        graph: graphReducer,
    },
});

export default store;
