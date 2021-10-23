import { createSelector } from "@reduxjs/toolkit";
export const getItems = (state) => state.contacts.items;
export const getFilter = (state) => state.contacts.filter;
export const getLoading = (state) => state.contacts.isLoading;

//МЕМОИЗАЦИЯ(КЕШИРОВАНИЕ)
export const getVisibleContacts = createSelector(
  [getItems, getFilter],
  (items, filter) => {
    const normalizedFilter = filter.toLowerCase();
    return items.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );
  }
);

//СОСТАВНОЙ(КОМПОЗИТНЫЙ) СЕЛЕКТОР
// export const getVisibleContacts = (state) => {
//   const allItems = getItems(state);
//   const filter = getFilter(state);
//   const normalizedFilter = filter.toLowerCase();

//   return allItems.filter(({ name }) =>
//     name.toLowerCase().includes(normalizedFilter)
//   );
// };
