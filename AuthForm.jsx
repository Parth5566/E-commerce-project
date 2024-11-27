import React, { useState, useEffect } from "react";
import image from "../assets/auth.jpg";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";

const AuthPage = () => {
  const [isSignIn, setIsSignIn] = useState(false);
  const navigate = useNavigate();

  // Check if user is already logged in (authToken exists in localStorage)
  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      navigate("/homee"); // Redirect to the home page if user is authenticated
    }
  }, [navigate]);

  const toggleAuthMode = () => {
    setIsSignIn(!isSignIn);
  };

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if required checkboxes are checked
    const rememberMeChecked = document.getElementById("remember-me")?.checked;
    const termsChecked = document.getElementById("terms")?.checked;

    // Display error if terms not checked for sign up
    if (!termsChecked && !isSignIn) {
      toast.error("Please agree to the terms and conditions.");
      return;
    }

    if (!rememberMeChecked && isSignIn) {
      toast.error("Please check 'Remember Me' to continue.");
      return;
    }

    const url = isSignIn
      ? "http://127.0.0.1:3000/api/auth/signin"
      : "http://127.0.0.1:3000/api/auth/signup";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      // Error Handling for Existing User (for Signup)
      if (!response.ok && data.message === "Sorry, a user with this email already exists") {
        toast.error("Email is already registered.");
        return;
      }

      // Error Handling for Wrong Credentials (for Sign In)
      if (!response.ok && isSignIn) {
        toast.error("Wrong details, please check your credentials.");
        return;
      }

      // Success: Save user details to localStorage
      if (response.ok) {
        const { userId, authtoken } = data;

        // Save to local storage
        localStorage.setItem("userId", userId);
        localStorage.setItem("authToken", authtoken);

        toast.success(isSignIn ? "Signed in successfully!" : "Signed up successfully!");
        navigate("/homee");
      }
    } catch (error) {
      console.error("Error:", error.message);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        backgroundColor: "white",
      }}
    >
      {/* Left Side */}
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative", // Container to position text over the image
        }}
      >
        <img
          src={image}
          alt="Auth Illustration"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>
      <Toaster />
      {/* Right Side */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* Heading */}
        <h1
          style={{
            marginBottom: "20px",
            fontSize: "28px",
            fontWeight: "bold",
            textAlign: "left", // Align to the left
            color: "black",
            width: "70%", // Make sure the heading aligns with input fields
          }}
        >
          {isSignIn ? "Sign In" : "Sign Up"}
        </h1>

        {/* Toggle between Sign In and Sign Up */}
        <p
          style={{
            color: "#333",
            width: "70%", // Align with input fields
          }}
        >
          {isSignIn ? (
            <>
              Don’t have an account?{" "}
              <span
                style={{
                  color: "green",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
                onClick={toggleAuthMode}
              >
                Sign Up
              </span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span
                style={{
                  color: "green",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
                onClick={toggleAuthMode}
              >
                Sign In
              </span>
            </>
          )}
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          style={{
            width: "70%",
            textAlign: "left", // Align the form elements to the left
          }}
        >
          {!isSignIn && (
            <>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                style={{
                  width: "100%",
                  padding: "10px 0px",
                  marginBottom: "15px",
                  border: "none",
                  borderBottom: "2px solid grey",
                  outline: "none",
                }}
              />
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
                style={{
                  width: "100%",
                  padding: "10px 0px",
                  marginBottom: "15px",
                  border: "none",
                  borderBottom: "2px solid grey",
                  outline: "none",
                }}
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                style={{
                  width: "100%",
                  padding: "10px 0px",
                  marginBottom: "15px",
                  border: "none",
                  borderBottom: "2px solid grey",
                  outline: "none",
                }}
              />
            </>
          )}

          {/* Username input added for sign-in */}
          {isSignIn && (
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              style={{
                width: "100%",
                padding: "10px 0px",
                marginBottom: "15px",
                border: "none",
                borderBottom: "2px solid grey",
                outline: "none",
              }}
            />
          )}

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            style={{
              width: "100%",
              padding: "10px 0px",
              marginBottom: "15px",
              border: "none",
              borderBottom: "2px solid grey",
              outline: "none",
            }}
          />

          {isSignIn && (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "15px",
              }}
            >
              <div>
                <input
                  type="checkbox"
                  id="remember-me"
                  style={{ width: "16px", height: "16px" }}
                />
                <label
                  htmlFor="remember-me"
                  style={{
                    marginLeft: "5px",
                    color: "#333",
                    fontSize: "14px",
                  }}
                >
                  Remember Me
                </label>
              </div>
              <span
                style={{
                  color: "#333",
                  cursor: "pointer",
                  textDecoration: "underline",
                  fontSize: "14px",
                }}
              >
                Forgot Password?
              </span>
            </div>
          )}

          {!isSignIn && (
            <div style={{ marginBottom: "15px" }}>
              <input
                type="checkbox"
                id="terms"
                style={{ width: "16px", height: "16px" }}
              />
              <label
                htmlFor="terms"
                style={{
                  marginLeft: "5px",
                  color: "grey",
                  fontSize: "14px",
                }}
              >
                I agree with Terms Policy, and Privacy Policy
              </label>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: "green",
              color: "white",
              border: "none",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            {isSignIn ? "Sign In" : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
