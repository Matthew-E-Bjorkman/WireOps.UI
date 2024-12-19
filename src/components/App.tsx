import React from "react";
import "../style/App.css";
import Header from "./Header.tsx";
import HomePage from "./HomePage.tsx";
import LoginForm from "./LoginForm.tsx";

export default function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);

  return (
    <div>
      <Header />
      <div>
        {loggedIn ? <HomePage /> : <LoginForm setLoggedIn={setLoggedIn} />}
      </div>
    </div>
  );
}
