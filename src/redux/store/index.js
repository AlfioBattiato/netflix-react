import { configureStore  } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import dataReducer from '../reducers/dataReducer';


// import rootReducer from '../reducers';

const persistConfig = {
  key: 'root',
  storage,
 
};


const persistedReducer = persistReducer(persistConfig, dataReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    })
  },
})
const persistor = persistStore(store);

export { store, persistor }; // Esporta sia store che persistor separatamente
