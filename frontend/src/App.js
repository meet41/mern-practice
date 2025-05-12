import React from "react";
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";

function App() {
  return (
    <div>
      <h1>Post App</h1>
      <PostForm />
      <PostList />
    </div>
  );
}

export default App;