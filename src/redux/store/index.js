import { configureStore } from '@reduxjs/toolkit'
import dataReducer from '../reducers/dataReducer' // non serve /index, basta puntare alla cartella che lo contiene




const store = configureStore({
  reducer: dataReducer,
})

export default store
