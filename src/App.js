import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Callback from "./components/Callback";
import Lyriks from "./components/Lyriks";
import { useStateProvider } from "./utlis/StateProvider";
import { reducerCases } from "./utlis/Constants";

function App() {
  const [{ token }, dispatch] = useStateProvider();

  useEffect(() => {
    // Check localStorage for token
    const localToken = window.localStorage.getItem("token");
    console.log("Checking token from localStorage:", localToken); // Log token check

    if (localToken) {
      console.log("Token found in localStorage, setting token:", localToken);
      dispatch({ type: reducerCases.SET_TOKEN, token: localToken });
    } else {
      console.log("No token found, redirecting to login.");
    }
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={token ? <Lyriks /> : <Login />} />
        <Route path="/callback" element={<Callback />} />
      </Routes>
    </Router>
  );
}

export default App;
