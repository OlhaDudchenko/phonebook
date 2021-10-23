import { createReducer } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { filterItems } from "./contacts-actions";
import {
  fetchContacts,
  addContacts,
  deleteContacts,
} from "./contacts-operations";

const filter = createReducer("", {
  [filterItems]: (_, { payload }) => payload,
});

const items = createReducer([], {
  [fetchContacts.fulfilled]: (_, { payload }) => payload,
  [addContacts.fulfilled]: (state, { payload }) => [...state, payload],
  [deleteContacts.fulfilled]: (state, { payload }) =>
    state.filter(({ id }) => id !== payload),
});

const isLoading = createReducer(false, {
  [fetchContacts.pending]: () => true,
  [fetchContacts.fulfilled]: () => false,
  [fetchContacts.rejected]: () => false,

  [addContacts.pending]: () => true,
  [addContacts.fulfilled]: () => false,
  [addContacts.rejected]: () => false,

  [deleteContacts.pending]: () => true,
  [deleteContacts.fulfilled]: () => false,
  [deleteContacts.rejected]: () => false,
});

const error = createReducer(null, {
  [fetchContacts.rejected]: (_, action) => action.payload,
  [fetchContacts.pending]: () => null,
  [addContacts.rejected]: (_, action) => action.payload,
  [addContacts.pending]: () => null,
  [deleteContacts.rejected]: (_, action) => action.payload,
  [deleteContacts.pending]: () => null,
});
export default combineReducers({
  items,
  filter,
  isLoading,
  error,
});

//Reducer with simple redux:
// const items = (state = contactsList, { type, payload }) => {

//     switch (type) {
//         case types.ADD:
//             return [...state, payload];

//         case types.DELETE:
//             return state.filter(({id})=>id !== payload)

//         default:
//             return state;
//     }
// };

// const filter = (state = "", {type,payload}) => {
//     switch (type) {
//         case types.CHANGE_FILTER:
//             return payload;
//         default:
//         return state;
//     }

// };
