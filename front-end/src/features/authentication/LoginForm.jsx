import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import SpinnerMini from "../../ui/SpinnerMini";
import { useLogin } from "./useLogin";

function LoginForm() {
  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("admin123");
  const { login, isLogin } = useLogin();

  function handleSubmit(e) {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }
    login(
      { email, password },
      {
        onSettled: () => {
          setPassword("");
          setEmail("");
        },
      }
    );
  }
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/api/login/auth/google";
  };
  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label="Email address">
        <Input
          type="email"
          id="email"
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLogin}
        />
      </FormRowVertical>
      <FormRowVertical label="Password">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLogin}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button size="large" disabled={isLogin}>
          {isLogin ? <SpinnerMini /> : "Login"}
        </Button>
        <Button onClick={handleGoogleLogin}>Sign in with Google</Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
