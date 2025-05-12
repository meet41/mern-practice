import React, { useState, useEffect } from "react";
import axios from "axios";

function PostList() {
  const [posts, setPosts] = useState([]);
  const [editPost, setEditPost] = useState(null); // State for the post being edited

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/posts");
      setPosts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/posts/${id}`);
      alert("Post deleted successfully!");
      fetchPosts();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (post) => {
    setEditPost(post); // Set the current post to be edited
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("header", editPost.header);
    formData.append("description", editPost.description);
    if (editPost.image instanceof File) {
      formData.append("image", editPost.image);
    }

    try {
      await axios.put(`http://localhost:5000/api/posts/${editPost._id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Post updated successfully!");
      setEditPost(null); // Close the edit form
      fetchPosts();
    } catch (err) {
      console.error(err);
      alert("Failed to update post");
    }
  };

  return (
    <div>
      {editPost ? (
        <form onSubmit={handleUpdate}>
          <input
            type="text"
            value={editPost.header}
            onChange={(e) => setEditPost({ ...editPost, header: e.target.value })}
            required
          />
          <textarea
            value={editPost.description}
            onChange={(e) => setEditPost({ ...editPost, description: e.target.value })}
            required
          ></textarea>
          <input
            type="file"
            onChange={(e) => setEditPost({ ...editPost, image: e.target.files[0] })}
          />
          <button type="submit">Update</button>
          <button onClick={() => setEditPost(null)}>Cancel</button>
        </form>
      ) : (
        posts.map((post) => (
          <div key={post._id}>
            <h2>{post.header}</h2>
            <p>{post.description}</p>
            <img src={`http://localhost:5000/${post.image}`} alt={post.header} width="200" />
            <button onClick={() => handleEdit(post)}>Update</button>
            <button onClick={() => handleDelete(post._id)}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
}

export default PostList;