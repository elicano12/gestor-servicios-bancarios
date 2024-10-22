import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth.slices";
import salesReducer from "./slices/sales.slices";
import usersReducer from "./slices/users.slices";
import saleUpdatedReducer from "./slices/saleUpdate.slices";
import productsReducer from "./slices/products.slices";
import salesDeleteReducer from "./slices/salesDelete.slices";
import {
  saveStateToLocalStorage,
  loadStateFromLocalStorage,
} from "./util/localstorage";

const persistedState = loadStateFromLocalStorage();

const store = configureStore({
  reducer: {
    auth: authReducer,
    sales: salesReducer,
    users: usersReducer,
    saleUpdate: saleUpdatedReducer,
    products: productsReducer,
    salesDelete: salesDeleteReducer,
  },
  preloadedState: persistedState,
});

store.subscribe(() => {
  saveStateToLocalStorage(store.getState());
});

export default store;
