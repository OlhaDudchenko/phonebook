import { useState } from "react";
import { useDispatch } from "react-redux";
import { authOperations } from "redux/authorization";
import { Section } from "components/Section";
import { Input, FormButton } from "components/ContactForm/ContactForm.styled";
import { Form } from "./Login.styled";

export default function LoginView() {
  const dispatch = useDispatch();

  const [user, setUser] = useState({ email: "", password: "" });
  const { email, password } = user;

  const handleChange = ({ target: { name, value } }) => {
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(authOperations.login({ email, password }));
    setUser({ email: "", password: "" });
  };

  return (
    <>
      <Section>
        <h1>Sign In</h1>
        <Form onSubmit={handleSubmit} autoComplete="off">
          <label htmlFor="email">Email</label>
          <Input
            id="email"
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            required
          />

          <label htmlFor="pass">Password</label>
          <Input
            id="pass"
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            required
          />

          <FormButton type="submit">Sign In</FormButton>
        </Form>
      </Section>
    </>
  );
}
