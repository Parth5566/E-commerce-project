import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [message, setMessage] = useState('');
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchPosts();
    }, []);

    // Fetch all posts from the backend
    const fetchPosts = async () => {
        try {
            const response = await fetch('http://127.0.0.1:3000/api/createPost/getAllPosts');
            if (response.ok) {
                const data = await response.json();
                setPosts(data);
            } else {
                console.error("Failed to fetch posts");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    // Handle logout
    const handleLogout = () => {
        localStorage.removeItem('authtoken');    
        navigate('/');
    };

    // Handle post submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const User = localStorage.getItem("userId");
            if (!User) {
                throw new Error("User ID not found in local storage");
            }

            const response = await fetch('http://127.0.0.1:3000/api/createPost/addPost', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, content, User }),
            });

            if (response.ok) {
                const data = await response.json();
                setMessage("Post created successfully!");
                setTitle('');
                setContent('');
                fetchPosts(); //Fetch posts again to update the list with the new post
            } else {
                setMessage("Failed to create post.");
            }
        } catch (error) {
            console.error("Error:", error);
            setMessage("An error occurred while creating the post.");
        }
    };

    return (
        <div className="container mt-5" style={{ backgroundColor: '#739608', padding: '30px', borderRadius: '10px' }}>
            <h2 className="mb-4 text-center text-dark fw-bold">Create a New Post</h2>
            <form onSubmit={handleSubmit} className="card p-4 shadow-sm rounded">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label fw-bold">Title</label>
                    <input
                        type="text"
                        id="title"
                        className="form-control"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="content" className="form-label fw-bold">Content</label>
                    <textarea
                        id="content"
                        className="form-control"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                </div>
                <div className="d-flex justify-content-between">
                    <button type="submit" className="btn btn-primary">Add Post</button>
                    <button type="button" className="btn btn-danger" onClick={handleLogout}>Logout</button>
                </div>
            </form>

            {message && (
                <div className="alert alert-info mt-4">
                    {message}
                </div>
            )}

            <h3 className="mt-5 text-center">All Posts</h3>
            <div className="list-group mt-3">
                {posts.length > 0 ? (
                    posts.map((post) => (
                        <div key={post._id} className="list-group-item list-group-item-action flex-column align-items-start shadow-sm mb-3 rounded">
                            <h5 className="mb-1 fw-bold">{post.title}</h5>
                            <p className="mb-1">{post.content}</p>
                            <small className="text-muted">Posted by User ID: {post.User}</small>
                        </div>
                    ))
                ) : (
                    <p className="text-center">No posts available</p>
                )}
            </div>
        </div>
    );
};

export default Home;
