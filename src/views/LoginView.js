import { useState } from "react";
import { useDispatch } from "react-redux";
import { Section } from "components/Section";
import { Input, FormButton } from "components/ContactForm/ContactForm.styled";
import { Form } from "./Login.styled";
import { useLoginMutation } from "../redux/authorization/auth";
import { setCredentials } from "../redux/authorization/authSlice";

export default function LoginView() {
  const dispatch = useDispatch();

  const [user, setUser] = useState({ email: "", password: "" });
  const { email, password } = user;
  const [login] = useLoginMutation();

  const handleChange = ({ target: { name, value } }) => {
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    (async () => {
      const result = await login({ email, password });
      if (result) {
        dispatch(setCredentials(result.data));
      }
    })();
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
