import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { contactsOperations, contactsSelectors } from "redux/phonebook";
import PropTypes from "prop-types";
import Loader from "react-loader-spinner";
import {
  List,
  ContactsListItem,
  ContactsListButton,
  ContactsListName,
} from "./ContactList.styled";

export function ContactList() {
  const items = useSelector(contactsSelectors.getVisibleContacts);
  const loading = useSelector(contactsSelectors.getLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(contactsOperations.fetchContacts());
  }, [dispatch]);
  return (
    <>
      {loading && (
        <Loader
          type="ThreeDots"
          color="rgb(255, 222, 173)"
          height={80}
          width={80}
        />
      )}
      {items.length > 0 ? (
        <List>
          {items.map(({ id, name, number }) => {
            return (
              <ContactsListItem key={id} id={id}>
                <ContactsListName>
                  {name}: {number}
                </ContactsListName>
                <ContactsListButton
                  onClick={() =>
                    dispatch(contactsOperations.deleteContacts(id))
                  }
                >
                  Delete
                </ContactsListButton>
              </ContactsListItem>
            );
          })}
        </List>
      ) : (
        <span>Contacts are empty now</span>
      )}
    </>
  );
}

ContactList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};
