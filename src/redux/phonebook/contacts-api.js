import axios from "axios";

axios.defaults.baseURL = "https://connections-api.herokuapp.com/";

export async function fetchContacts() {
  const { data } = await axios.get("/contacts");

  return data;
}

export async function addContacts(config) {
  const { data } = await axios.post("/contacts", config);

  return data;
}

export async function deleteContacts(id) {
  await axios.delete(`/contacts/${id}`);
}
