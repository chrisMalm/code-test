import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./users/usersSlice";
import transactionReducer from "./transactions/transactionsSlice";
import itemsReducer from "./items/itemsSlice";
import signUpReducer from "./singup/signupSlice";
import protectedReducer from "./protected/protectedSlice";
import loginSlice from "./login/loginSlice";
import getLoggedInUser from "./getloggedInUser/getLoggedInUserSlice";
import logoutReducer from "./logout/logoutSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    transactions: transactionReducer,
    items: itemsReducer,
    signup: signUpReducer,
    protected: protectedReducer,
    login: loginSlice,
    me: getLoggedInUser,
    logout: logoutReducer,
  },
});

// detta gör så att typescript vet att dispatch har typen AppDispatch
// i Hooks.ts exporterar du den sen så här:
//  expect. export const useAppDispatch = () => useDispatch<AppDispatch>();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
