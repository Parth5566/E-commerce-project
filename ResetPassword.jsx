import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import 'bootstrap/dist/css/bootstrap.min.css';

const ResetPassword = () => {
    const { id, token } = useParams(); // Extract the parameters from the URL
    const navigate = useNavigate(); // Initialize navigate
    const [newPassword, setNewPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://127.0.0.1:3000/api/auth/reset-password/${id}/${token}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password: newPassword })
            });

            const json = await response.json();
            if (response.status === 200) {
                toast.success('Password has been reset successfully!');
                
                // Redirect after 2 seconds (2000 milliseconds)
                setTimeout(() => {
                    navigate('/AuthForm'); 
                }, 2000);
            } else {
                toast.error(json.error || 'Something went wrong!');
            }
        } catch (error) {
            console.error('Error resetting password:', error);
            toast.error('An error occurred. Please try again later.');
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <Toaster />
            <div className="col-md-6 col-lg-4 p-4 border rounded shadow bg-light">
                <h2 className="text-center mb-4">Reset Password</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-3">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Enter your new password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Reset Password</button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
