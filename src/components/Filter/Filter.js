import React from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { contactsSelectors, contactsActions } from "redux/phonebook";
import { ContactListWrapper, ContactListInput } from "./Filter.styled";

export function Filter() {
  const value = useSelector(contactsSelectors.getFilter);
  const dispatch = useDispatch();
  return (
    <ContactListWrapper>
      <label>Find contacts by name</label>
      <ContactListInput
        type="text"
        value={value}
        onChange={(event) =>
          dispatch(contactsActions.filterItems(event.target.value))
        }
      />
    </ContactListWrapper>
  );
}

Filter.propTypes = {
  value: PropTypes.string,
};
