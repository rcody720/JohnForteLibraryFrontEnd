import {
  createAsyncThunk,
  createSlice,
  isRejectedWithValue,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import Book from "../types/book";
import Card from "../types/card";

export interface BookState {
  status: "idle" | "loading" | "failed";
  checkoutStatus: "idle" | "loading" | "failed";
  allBooks: Array<any>;
  availableBooks: Array<any>;
  filteredBooks: Array<any>;
  deletedBooks: Array<any>;
  bookToDelete: any;
  checkoutResponseOpen: boolean;
  checkedoutBook: any;
  dueDate: any;
  patronBooks: Array<any>;
  checkInResponseOpen: boolean;
  checkInResponseMessage: string;
  patronInfo: any;
  patronInfoOpen: boolean;
  availableChecked: boolean;
  overdueChecked: boolean;
  searchBy: string;
}

const initialState: BookState = {
  status: "loading",
  checkoutStatus: "idle",
  allBooks: new Array<any>(),
  availableBooks: new Array<any>(),
  filteredBooks: new Array<any>(),
  deletedBooks: new Array<any>(),
  bookToDelete: {},
  checkoutResponseOpen: false,
  checkedoutBook: {},
  dueDate: "",
  patronBooks: new Array<any>(),
  checkInResponseOpen: false,
  checkInResponseMessage: "",
  patronInfo: {
    checkedOutInfo: {
      name: "",
      address: "",
      phoneNumber: "",
      email: "",
      cardNumber: "",
    },
    dueDate: "",
    checkedOutDate: "",
  },
  patronInfoOpen: false,
  availableChecked: true,
  overdueChecked: false,
  searchBy: "title",
};

const axios = require("axios").default;

export const getAllBooks = createAsyncThunk("book/getAllBooks", async () => {
  const response = await fetch("https://localhost:44371/api/Book");
  const data = await response.json();
  if (!response.ok) {
    return isRejectedWithValue(response);
  }
  return data;
});

export const getAllAvailableBooks = createAsyncThunk(
  "book/getAllAvailableBooks",
  async () => {
    const response = await fetch(
      "https://localhost:44371/api/Book/Book/available"
    );
    const data = await response.json();
    if (!response.ok) {
      return isRejectedWithValue(response);
    }
    return data;
  }
);

export const getPatronInfo = createAsyncThunk(
  "book/getPatronInfo",
  async (bookId: any) => {
    const response = await fetch(
      "https://localhost:44371/api/Book/Info/" + bookId
    );
    const data = await response.json();
    if (!response.ok) {
      return isRejectedWithValue(response);
    }
    return data;
  }
);

export const fetchPatronBooksAsync = createAsyncThunk(
  "book/fetchAPatronBooksAsync",
  async (cardNumber: string) => {
    const response = await fetch(
      "https://localhost:44371/api/Book/Book/CheckedOut?cardNumber=" +
        cardNumber
    );
    const data = await response.json();
    if (!response.ok) {
      return isRejectedWithValue(response);
    }
    return data;
  }
);

export const addNewBook = createAsyncThunk(
  "book/addNewBook",
  async (bookBeingAdded: Book) => {
    const response = await fetch("https://localhost:44371/api/Book", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(bookBeingAdded),
    });
    const data = await response.json();
    if (!response.ok) {
      return data.then(Promise.reject.bind(Promise));
    }
    return data;
  }
);

export const addLibraryCard = createAsyncThunk(
  "cards/addCard",
  async (card: Card) => {
    const response = await fetch("https://localhost:44371/api/Patron", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(card),
    });
    const data = await response.json();
    if (!response.ok) {
      return data.then(Promise.reject.bind(Promise));
    }
    return data;
  }
);

export const checkoutBook = createAsyncThunk(
  "book/checkout",
  async (checkoutData: any) => {
    const response = await fetch(
      "https://localhost:44371/api/Book/Book/CheckOut",
      {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(checkoutData),
      }
    );
    const data = await response.json();
    if (!response.ok) {
      return data.then(Promise.reject.bind(Promise));
    }
    return data;
  }
);

export const checkInBook = createAsyncThunk(
  "book/checkin",
  async (id: number) => {
    await axios.put("https:localhost:44371/api/Book/Book/CheckIn/", {
      bookId: id,
    });
    return id;
  }
);

export const deleteBook = createAsyncThunk(
  "book/deleteBook",
  async (book: any) => {
    await fetch("https://localhost:44371/api/Book/" + book.bookId, {
      method: "DELETE",
      headers: { "Content-type": "application/json" },
    });
  }
);

export const BookSlice = createSlice({
  name: "Book",
  initialState,
  reducers: {
    setFilteredBooks: (state, action: PayloadAction<Array<any>>) => {
      state.filteredBooks = action.payload;
    },
    addToDeletedBooks: (state, action: PayloadAction<Book>) => {
      state.deletedBooks = state.deletedBooks.concat(action.payload);
    },
    removeFromDeletedBooks: (state, action: PayloadAction<any>) => {
      var deletedIndex = state.deletedBooks.findIndex(function (book) {
        return book.bookId === action.payload.bookId;
      });
      if (deletedIndex !== -1) {
        state.deletedBooks.splice(deletedIndex, 1);
      }
    },
    removeFromAvailableBooks: (state, action: PayloadAction<any>) => {
      var index = state.availableBooks.findIndex(function (book) {
        return book.bookId === action.payload.bookId;
      });
      if (index !== -1) {
        state.availableBooks.splice(index, 1);
      }
    },
    removeFromFilteredBooks: (state, action: PayloadAction<any>) => {
      var index = state.filteredBooks.findIndex(function (book) {
        return book.bookId === action.payload.bookId;
      });
      if (index !== -1) {
        state.filteredBooks.splice(index, 1);
      }
    },
    setBookToDelete: (state, action: PayloadAction<Book>) => {
      state.bookToDelete = action.payload;
    },
    setCheckoutResponseOpen: (state, action: PayloadAction<boolean>) => {
      state.checkoutResponseOpen = action.payload;
    },
    setCheckInResponseOpen: (state, action: PayloadAction<boolean>) => {
      state.checkInResponseOpen = action.payload;
    },
    setCheckedoutBook: (state, action: PayloadAction<any>) => {
      state.checkedoutBook = action.payload;
    },
    setDueDate: (state, action: PayloadAction<any>) => {
      state.dueDate = action.payload;
    },
    setCheckInResponseMessage: (state, action: PayloadAction<string>) => {
      state.checkInResponseMessage = action.payload;
    },
    clearPatronBooks: (state, action: PayloadAction<any>) => {
      state.patronBooks = [];
    },
    setPatronInfoOpen: (state, action: PayloadAction<boolean>) => {
      state.patronInfoOpen = action.payload;
    },
    setAvailableChecked: (state, action: PayloadAction<boolean>) => {
      state.availableChecked = action.payload;
    },
    setOverdueChecked: (state, action: PayloadAction<boolean>) => {
      state.overdueChecked = action.payload;
    },
    setSearchBy: (state, action: PayloadAction<string>) => {
      state.searchBy = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllBooks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllBooks.fulfilled, (state, action) => {
        state.status = "idle";
        state.allBooks = state.allBooks.concat(action.payload.books);
      })
      .addCase(getAllBooks.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(getAllAvailableBooks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllAvailableBooks.fulfilled, (state, action) => {
        state.status = "idle";
        state.availableBooks = state.availableBooks.concat(
          action.payload.books
        );
        state.filteredBooks = action.payload.books;
      })
      .addCase(getAllAvailableBooks.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(addNewBook.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addNewBook.fulfilled, (state, action) => {
        state.status = "idle";
        state.allBooks.push(action.payload.addedBook);
        state.availableBooks.push(action.payload.addedBook);
        state.filteredBooks.push(action.payload.addedBook);
      })
      .addCase(addNewBook.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(addLibraryCard.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addLibraryCard.fulfilled, (state, action) => {
        state.status = "idle";
      })
      .addCase(addLibraryCard.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(checkoutBook.pending, (state) => {
        state.checkoutStatus = "loading";
      })
      .addCase(checkoutBook.fulfilled, (state, action) => {
        state.checkoutStatus = "idle";
      })
      .addCase(checkoutBook.rejected, (state) => {
        state.checkoutStatus = "failed";
      })
      .addCase(deleteBook.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteBook.fulfilled, (state) => {
        var filteredIndex = state.filteredBooks.findIndex(function (book) {
          return book.bookId === state.bookToDelete.bookId;
        });
        if (filteredIndex !== -1) {
          state.filteredBooks.splice(filteredIndex, 1);
        }

        var allIndex = state.allBooks.findIndex(function (book) {
          return book.bookId === state.bookToDelete.bookId;
        });
        if (allIndex !== -1) {
          state.allBooks.splice(allIndex, 1);
        }

        var availableIndex = state.availableBooks.findIndex(function (book) {
          return book.bookId === state.bookToDelete.bookId;
        });
        if (availableIndex !== -1) {
          state.availableBooks.splice(availableIndex, 1);
        }

        state.status = "idle";
      })
      .addCase(deleteBook.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(checkInBook.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkInBook.fulfilled, (state, action) => {
        state.status = "idle";
        var book = state.allBooks.find(function (book) {
          return book.bookId === action.payload;
        });

        var book2 = state.filteredBooks.find(function (book) {
          return book.bookId === action.payload;
        });

        var index = state.patronBooks.indexOf(book);
        state.patronBooks.splice(index, 1);

        if (book.isOverdue) {
          book.isOverdue = false;
          book2.isOverdue = false;
        }

        if (book2 === null) {
          state.filteredBooks.push(book);
        }

        state.availableBooks.push(book);
      })
      .addCase(checkInBook.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(fetchPatronBooksAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPatronBooksAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.patronBooks = action.payload.books;
      })
      .addCase(fetchPatronBooksAsync.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(getPatronInfo.pending, (state) => {
        //state.status = "loading";
      })
      .addCase(getPatronInfo.fulfilled, (state, action) => {
        state.status = "idle";
        state.patronInfo = action.payload;
      })
      .addCase(getPatronInfo.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const {
  setFilteredBooks,
  addToDeletedBooks,
  setBookToDelete,
  removeFromDeletedBooks,
  removeFromAvailableBooks,
  removeFromFilteredBooks,
  setCheckoutResponseOpen,
  setCheckedoutBook,
  setDueDate,
  clearPatronBooks,
  setCheckInResponseOpen,
  setCheckInResponseMessage,
  setPatronInfoOpen,
  setAvailableChecked,
  setOverdueChecked,
  setSearchBy,
} = BookSlice.actions;

export const selectAllBooks = (state: RootState) => state.BookReducer.allBooks;
export const selectAvailableBooks = (state: RootState) =>
  state.BookReducer.availableBooks;
export const selectFilteredBooks = (state: RootState) =>
  state.BookReducer.filteredBooks;
export const getStatus = (state: RootState) => state.BookReducer.status;
export const getCheckoutStatus = (state: RootState) =>
  state.BookReducer.checkoutStatus;
export const selectDeletedBooks = (state: RootState) =>
  state.BookReducer.deletedBooks;
export const selectCheckoutResponseOpen = (state: RootState) =>
  state.BookReducer.checkoutResponseOpen;
export const selectCheckoutedBook = (state: RootState) =>
  state.BookReducer.checkedoutBook;
export const selectDueDate = (state: RootState) => state.BookReducer.dueDate;
export const selectPatronBooks = (state: RootState) =>
  state.BookReducer.patronBooks;
export const selectCheckInResponseOpen = (state: RootState) =>
  state.BookReducer.checkInResponseOpen;
export const selectCheckInResponseMessage = (state: RootState) =>
  state.BookReducer.checkInResponseMessage;
export const selectPatronInfo = (state: RootState) =>
  state.BookReducer.patronInfo;
export const selectPatronInfoOpen = (state: RootState) =>
  state.BookReducer.patronInfoOpen;
export const selectAvailableChecked = (state: RootState) =>
  state.BookReducer.availableChecked;
export const selectOverdueChecked = (state: RootState) =>
  state.BookReducer.overdueChecked;
export const selectSearchBy = (state: RootState) => state.BookReducer.searchBy;

export default BookSlice.reducer;
