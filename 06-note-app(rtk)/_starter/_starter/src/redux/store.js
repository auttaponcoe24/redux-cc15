import { configureStore } from "@reduxjs/toolkit";
import noteReducer from "./noteSlice";

const store = configureStore({
	reducer: {
		// ชื่อ Store
		note: noteReducer,
		// auth: authReducer,
		// cart: cartReducer,
	},
});

export default store;
