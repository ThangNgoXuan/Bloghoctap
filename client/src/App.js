import Home from "./component/Home";
import Login from "./component/Login";
import Signup from "./component/Signup";
import Profile from "./component/Profile";
import CreatePost from "./component/CreatePorst";
import EditPost from "./component/EditPost";
import Blog from "./component/Blog";
import Search from "./component/Search";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import React from "react";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/createpost" element={<CreatePost />} />
        <Route exact path="/edipost" element={<EditPost />} />
        <Route exact path="/editpost" element={<EditPost />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/blog/:slug" element={<Blog />} />
        <Route exact path="/search/:query" element={<Search />} />
        <Route exact path="/hashtag/:query" element={<Search />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
