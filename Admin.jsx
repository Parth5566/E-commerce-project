import React from "react";
import { useNavigate } from "react-router-dom";  // Import useNavigate
import "bootstrap/dist/css/bootstrap.min.css";

const AdminPanel = () => {
  const navigate = useNavigate(); // Initialize the navigate hook

  const handleViewProducts = () => {
    navigate("/addproduct"); // Navigate to /addproduct when button is clicked
  };

  return (
    <div style={{ padding: "20px", backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      {/* Header */}
      <header
        className="text-center py-3 mb-4"
        style={{
          backgroundColor: "#343a40",
          color: "white",
          fontSize: "24px",
          fontWeight: "bold",
          borderRadius: "5px",
        }}
      >
        Admin Panel
      </header>

      {/* Main Content */}
      <div className="container">
        <div className="row">
          {/* Products Section */}
          <div className="col-md-4 mb-4">
            <div
              className="card"
              style={{
                backgroundColor: "#ffffff",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                borderRadius: "5px",
              }}
            >
              <div className="card-body text-center">
                <h5 className="card-title" style={{ fontWeight: "bold" }}>
                  Manage Products
                </h5>
                <p className="card-text">Add, edit, or delete products from the store.</p>
                <button
                  className="btn btn-primary mb-2"
                  onClick={handleViewProducts}  // Add the onClick handler
                >
                  View Products
                </button>
                <br />
              </div>
            </div>
          </div>

          {/* Users Section */}
          <div className="col-md-4 mb-4">
            <div
              className="card"
              style={{
                backgroundColor: "#ffffff",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                borderRadius: "5px",
              }}
            >
              <div className="card-body text-center">
                <h5 className="card-title" style={{ fontWeight: "bold" }}>
                  Manage Users
                </h5>
                <p className="card-text">View and manage registered users.</p>
                <button className="btn btn-success">View Users</button>
              </div>
            </div>
          </div>

          {/* Orders Section */}
          <div className="col-md-4 mb-4">
            <div
              className="card"
              style={{
                backgroundColor: "#ffffff",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                borderRadius: "5px",
              }}
            >
              <div className="card-body text-center">
                <h5 className="card-title" style={{ fontWeight: "bold" }}>
                  Manage Orders
                </h5>
                <p className="card-text">Track and update customer orders.</p>
                <button className="btn btn-warning text-white">View Orders</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer
        className="text-center py-3 mt-4"
        style={{
          backgroundColor: "#343a40",
          color: "white",
          borderRadius: "5px",
          fontSize: "14px",
        }}
      >
        © {new Date().getFullYear()} Admin Panel. All Rights Reserved.
      </footer>
    </div>
  );
};

export default AdminPanel;
