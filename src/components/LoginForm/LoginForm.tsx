import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { logIn } from "../../store/sessionSlice.tsx";

export default function LoginForm() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const isLoggedIn = useSelector((state: any) => state.session.loggedIn);
  const dispatch = useDispatch();

  function handleSubmit(submitEvent) {
    submitEvent.preventDefault();
    dispatch(logIn());
  }

  if (isLoggedIn) {
    return <Navigate to="/products" />;
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
