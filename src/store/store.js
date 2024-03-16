import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import loginReducer from './loginSlice';
import addRecipeReducer from './addRecipeSlice';
import recipiesReducer from './recipiesSlice';
import categoriesReducer from './categoriesSlice';
import ingredientsReducer from './ingredientsSlice';
import measuresReducer from './measuresSlice';
import detailsReducer from './detailsSlice';
import commentsSlice from './commentsSlice';
const reducers = {
  login: loginReducer,
  addRecipe: addRecipeReducer,
  recipies: recipiesReducer,
  categories: categoriesReducer,
  ingredients: ingredientsReducer,
  measures: measuresReducer,
  details: detailsReducer,
  comments:commentsSlice,
};

const rootReducer = combineReducers(reducers);

const persistConfig = { key: 'root', storage, whitelist: ['login','details'],blacklist: ['addRecipe','categories','ingredients','measures','comments'] };



const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
   reducer: persistedReducer, 
   
  });

export const persistor = persistStore(store);

