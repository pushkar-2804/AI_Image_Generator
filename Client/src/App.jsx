import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import firebase from "./firebase"; // Import the firebase.js file
import logo from "./assets/logo.svg";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Add an event listener to handle authentication state changes
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });

    // Clean up the event listener when the component unmounts
    return () => unsubscribe();
  }, []);

  const handleSignInWithGoogle = () => {
    // Create a Google sign-in provider
    const provider = new firebase.auth.GoogleAuthProvider();

    // Sign in with Google using a popup window
    firebase
      .auth()
      .signInWithPopup(provider)
      .catch((error) => {
        // Handle sign-in errors if needed
        console.error(error);
      });
  };

  return (
    <div>
      <header className="w-full flex justify-between align-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]">
        <Link to="/">
          <img src={logo} alt="logo" className="w-28 object-contain" />
        </Link>
        {user ? (
          <Link
            to="/create-post"
            className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md"
          >
            Create
          </Link>
        ) : (
          <button
            onClick={handleSignInWithGoogle}
            className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md"
          >
            Sign in with Google
          </button>
        )}
      </header>
      <main className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
        <Routes>
          {user && <Route path="/" element={<Home />} />}
          {user && <Route path="/create-post" element={<CreatePost />} />}
        </Routes>
      </main>
    </div>
  );
};

export default App;
