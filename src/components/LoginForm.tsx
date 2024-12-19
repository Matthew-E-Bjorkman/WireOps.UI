import React from "react";

interface LoginFormProps {
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function LoginForm({ setLoggedIn }: LoginFormProps) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleSubmit(submitEvent) {
    submitEvent.preventDefault();
    setLoggedIn(true);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
}
