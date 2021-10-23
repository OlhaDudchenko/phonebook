import React from "react";
import { useSelector } from "react-redux";
import { contactsSelectors } from "redux/phonebook";
import { ContactForm } from "components/ContactForm";
import { ContactList } from "components/ContactList";
import { Filter } from "components/Filter";
import { DropDownMenu } from "components/DropDownMenu";
import { Section } from "components/Section";

export default function ContactsView() {
  const contacts = useSelector(contactsSelectors.getItems);

  return (
    <>
      <Section title="Phonebook">
        <ContactForm />
        <DropDownMenu />
      </Section>
      <Section title="Contacts">
        {contacts.length > 0 && <Filter />}
        <ContactList />
      </Section>
    </>
  );
}
