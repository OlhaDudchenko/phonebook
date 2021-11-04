import { useState } from "react";
import { useDispatch } from "react-redux";
import { Section } from "components/Section";
import { Input, FormButton } from "components/ContactForm/ContactForm.styled";
import { Form } from "./RegisterView.styled";
import { useRegisterMutation } from "../redux/authorization/auth";
import { setCredentials } from "../redux/authorization/authSlice";

export default function RegisterView() {
  const dispatch = useDispatch();
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const { name, email, password } = user;
  const [register] = useRegisterMutation({ skip: user === "" });

  const handleChange = ({ target: { name, value } }) => {
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    (async () => {
      const result = await register({ name, email, password });
      if (result.data) {
        dispatch(setCredentials(result.data));
      }
    })();

    setUser({ name: "", email: "", password: "" });
  };

  return (
    <>
      <Section>
        <h1>Sign Up</h1>

        <Form onSubmit={handleSubmit} autoComplete="off">
          <label htmlFor="name">Name</label>
          <Input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={handleChange}
            required
            autoComplete="off"
          />

          <label htmlFor="email">Email</label>
          <Input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={handleChange}
            required
            autoComplete="off"
          />

          <label htmlFor="pass">Password</label>
          <Input
            id="pass"
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            autoComplete="off"
            minLength="7"
            required
          />

          <FormButton type="submit">Sign Up</FormButton>
        </Form>
      </Section>
    </>
  );
}
