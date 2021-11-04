import React, { useState } from "react";
import { ContactForm } from "components/ContactForm";
import { ContactList } from "components/ContactList";
import { Filter } from "components/Filter";
import { DropDownMenu } from "components/DropDownMenu";
import { Section } from "components/Section";
import { useFetchContactsQuery } from "../redux/phonebook/contacts";

export default function ContactsView() {
  const { data: contacts = [], isLoading } = useFetchContactsQuery();
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const getVisibleContact = () => {
    const normalizedFilter = value.toLowerCase();
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );
  };

  return (
    <>
      <Section title="Phonebook">
        <ContactForm contacts={getVisibleContact()} />
        <DropDownMenu />
      </Section>
      <Section title="Contacts">
        {contacts.length > 0 && <Filter value={value} onChange={onChange} />}
        <ContactList contacts={getVisibleContact()} isLoading={isLoading} />
      </Section>
    </>
  );
}
