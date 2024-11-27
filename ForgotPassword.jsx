import React, { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const isValidEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!email) {
            toast.error('Please enter your email');
            return;
        }
    
        if (!isValidEmail(email)) {
            toast.error('Please enter a valid email');
            return;
        }
    
        try {
            console.log("Sending request to reset password...");
            const response = await fetch("http://127.0.0.1:3000/api/auth/forgot-password", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });
    
            console.log("Response received:", response);
    
            // Check if response is JSON-compatible
            const json = await response.json().catch(() => {
                console.error("Response is not JSON");
                return null;
            });
    
            if (response.status === 200 && json) {
                toast.success('Reset link sent to your Gmail!');
                console.log("Redirecting to AuthForm...");
                navigate('/AuthForm');
            } else {
                toast.error(json?.error || 'Something went wrong!');
            }
        } catch (error) {
            console.error("Error sending reset link:", error);
            toast.error('An error occurred. Please try again later.');
        }
    };

    return (
        <div className="container py-5 d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <Toaster />
            <div className="col-md-6 p-4 bg-light rounded shadow">
                <h2 className="text-center mb-4 text-primary">Forgot Password</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-warning w-100">Send Reset Link</button>
                </form>
                <div className="text-center mt-4">
                    <button 
                        className="btn btn-link" 
                        onClick={() => navigate('/AuthForm')}
                    >
                        Back to Login
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
