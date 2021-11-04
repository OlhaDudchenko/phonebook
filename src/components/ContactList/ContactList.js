import React from "react";
import PropTypes from "prop-types";
import Loader from "react-loader-spinner";
import { useDeleteContactsMutation } from "../../redux/phonebook/contacts";
import {
  List,
  ContactsListItem,
  ContactsListButton,
  ContactsListName,
} from "./ContactList.styled";

export function ContactList({ contacts, isLoading }) {
  const [deleteContacts] = useDeleteContactsMutation();

  return (
    <>
      {isLoading && (
        <Loader
          type="ThreeDots"
          color="rgb(255, 222, 173)"
          height={80}
          width={80}
        />
      )}
      {contacts.length > 0 ? (
        <List>
          {contacts.map(({ id, name, number }) => {
            return (
              <ContactsListItem key={id} id={id}>
                <ContactsListName>
                  {name}: {number}
                </ContactsListName>
                <ContactsListButton onClick={() => deleteContacts(id)}>
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
