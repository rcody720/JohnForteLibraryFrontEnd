import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { bookApi } from "../Components/Book";
import BookReducer from "../Components/BookSlice";

export const store = configureStore({
  reducer: {
    BookReducer,
    [bookApi.reducerPath]: bookApi.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
