import React, { useState } from "react";
import axios from "axios";

function PostForm() {
  const [header, setHeader] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("header", header);
    formData.append("description", description);
    formData.append("image", image);

    try {
      await axios.post("http://localhost:5000/api/posts", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Post created successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to create post");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Header"
        value={header}
        onChange={(e) => setHeader(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      ></textarea>
      <input type="file" onChange={(e) => setImage(e.target.files[0])} required />
      <button type="submit">Submit</button>
    </form>
  );
}

export default PostForm;