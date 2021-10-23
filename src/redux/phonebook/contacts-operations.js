import { createAsyncThunk } from "@reduxjs/toolkit";
import * as contactsApi from "./contacts-api";

export const fetchContacts = createAsyncThunk(
  "contacts/fetchContacts",
  async () => {
    const contacts = await contactsApi.fetchContacts();

    return contacts;
  }
);

export const addContacts = createAsyncThunk(
  "contacts/addContacts",
  async (newContact) => {
    const contacts = await contactsApi.addContacts(newContact);
    return contacts;
  }
);

export const deleteContacts = createAsyncThunk(
  "contacts/deleteContacts",
  async (id) => {
    await contactsApi.deleteContacts(id);
    return id;
  }
);

//=================CLASSIC METHOD WITHOUT CREATEASYNCTHUNK ===================================

// export const fetchContacts = () => async (dispatch) => {
//   dispatch(contactsActions.fetchContactsRequest());
//   try {
//     const contacts = await contactsApi.fetchContacts();

//     dispatch(contactsActions.fetchContactsSuccess(contacts));
//   } catch (error) {
//     dispatch(contactsActions.fetchContactsError(error));
//   }
// };

// export const postContacts = (config) => async (dispatch) => {
//   dispatch(contactsActions.postContactsRequest());
//   try {
//     const contacts = await contactsApi.postContacts(config);

//     dispatch(contactsActions.postContactsSuccess(contacts));
//   } catch (error) {
//     dispatch(contactsActions.postContactsError(error));
//   }
// };

// export const deleteContacts = (id) => async (dispatch) => {
//   dispatch(contactsActions.deleteContactsRequest());
//   try {
//     await contactsApi.deleteContacts(id);

//     dispatch(contactsActions.deleteContactsSuccess(id));
//   } catch (error) {
//     dispatch(contactsActions.deleteContactsError(error));
//   }
// };

//===================ACTIONS FOR THIS===================

// // 1)first loading contacts on page:
// //pending
// export const fetchContactsRequest = createAction(
//   "contacts/fetchContactsRequest"
// );
// //fulfilled
// export const fetchContactsSuccess = createAction(
//   "contacts/fetchContactsSuccess"
// );
// //rejected
// export const fetchContactsError = createAction("contacts/fetchContactsError");

// 2)add contacts:
// export const add = createAction("phonebook/add");
//pending
// export const postContactsRequest = createAction("contacts/postContactsRequest");
// //fulfilled
// export const postContactsSuccess = createAction("contacts/postContactsSuccess");
// //rejected
// export const postContactsError = createAction("contacts/postContactsError");

// 3)delete contacts:
// export const add = createAction("phonebook/add");
//pending
// export const deleteContactsRequest = createAction(
//   "contacts/deleteContactsRequest"
// );
//fulfilled
// export const deleteContactsSuccess = createAction(
//   "contacts/deleteContactsSuccess"
// );
//rejected
// export const deleteContactsError = createAction("contacts/deleteContactsError");
