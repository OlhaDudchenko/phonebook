import { createAction } from "@reduxjs/toolkit";

export const filterItems = createAction("phonebook/filter");

//Action with simple redux:
// export const add = (newContact) => ({
//         type: types.ADD,
//         payload: newContact,

// });
