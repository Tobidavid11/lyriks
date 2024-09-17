import React, { useEffect } from "react";
import { useStateProvider } from "../utlis/StateProvider";
import { reducerCases } from "../utlis/Constants";

export default function Callback() {
  const [{}, dispatch] = useStateProvider();

  useEffect(() => {
    const hash = window.location.hash;
    let localToken = window.localStorage.getItem("token");

    if (!localToken && hash) {
      localToken = hash.substring(1).split("&")[0].split("=")[1];
      console.log("Token extracted from URL hash:", localToken); // Log token
      window.localStorage.setItem("token", localToken);
      window.location.hash = ""; // Clear the hash from the URL
      dispatch({ type: reducerCases.SET_TOKEN, token: localToken });
      window.location.href = "/"; // Redirect to main app
    }
  }, [dispatch]);

  return <div>Redirecting...</div>;
}
