import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ManageProducts = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [tags, setTags] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const navigate = useNavigate();

  // Fetch all products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://127.0.0.1:3000/api/product/getproducts");
      const result = await response.json();
      setProducts(result.products || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Handle product submission (Add)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("tags", tags);
    if (image) formData.append("image", image);

    const endpoint = editingProduct
      ? `http://127.0.0.1:3000/api/product/updateproduct/${editingProduct._id}`
      : "http://127.0.0.1:3000/api/product/addproduct";

    const method = editingProduct ? "PUT" : "POST";

    try {
      const response = await fetch(endpoint, {
        method,
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        setMessage(result.message || "Product saved successfully!");
        resetForm();
        fetchProducts();
      } else {
        const errorData = await response.json();
        setMessage(errorData.errors?.[0]?.msg || "Failed to save product.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred while saving the product.");
    }
  };

  // Handle product deletion
  const handleDelete = async (productId) => {
    try {
      const response = await fetch(`http://127.0.0.1:3000/api/product/deleteproduct/${productId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setMessage("Product deleted successfully!");
        setProducts(products.filter((product) => product._id !== productId));
      } else {
        const errorData = await response.json();
        setMessage(errorData.errors?.[0]?.msg || "Failed to delete product.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred while deleting the product.");
    }
  };

  // Handle editing a product
  const handleEdit = (product) => {
    setEditingProduct(product);
    setName(product.name);
    setDescription(product.description);
    setPrice(product.price);
    setTags(product.tags);
    setImage(null);
  };

  // Reset form fields
  const resetForm = () => {
    setName("");
    setDescription("");
    setPrice("");
    setTags("");
    setImage(null);
    setEditingProduct(null);
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("authtoken");
    navigate("/");
  };

  return (
    <div className="d-flex" style={{ minHeight: "100vh", backgroundColor: "#121212" }}>
      {/* Sidebar */}
      <div
        style={{
          width: "250px",
          height: "100vh",
          position: "fixed",
          top: "0",
          left: "0",
          paddingTop: "50px",
          backgroundColor: "#1e1e1e",
          color: "#fff",
        }}
      >
        <h4 style={{ textAlign: "center" }}>Admin Panel</h4>
        <ul style={{ listStyleType: "none", padding: "0" }}>
          <li style={{ margin: "20px 0" }}>
            <a href="/dashboard" style={{ textDecoration: "none", color: "#fff" }}>
              Dashboard
            </a>
          </li>
          <li style={{ margin: "20px 0" }}>
            <a href="/products" style={{ textDecoration: "none", color: "#fff" }}>
              Products
            </a>
          </li>
          <li style={{ margin: "20px 0" }}>
            <a href="#" style={{ textDecoration: "none", color: "#fff" }} onClick={handleLogout}>
              Logout
            </a>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="container-fluid p-5" style={{ backgroundColor: "#121212", marginLeft: "250px" }}>
        <div className="row">
          <div className="col-12">
            {/* Add / Edit Product Form */}
            <div
              style={{
                backgroundColor: "#181818",
                borderRadius: "10px",
                padding: "30px",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <h4 style={{ color: "#fff", textAlign: "center" }}>
                {editingProduct ? "Edit Product" : "Add New Product"}
              </h4>
              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "15px" }}>
                  <label style={{ color: "#fff" }}>Product Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    style={{
                      width: "100%",
                      padding: "10px",
                      backgroundColor: "#2c2c2c",
                      color: "#fff",
                      borderRadius: "5px",
                    }}
                  />
                </div>
                <div style={{ marginBottom: "15px" }}>
                  <label style={{ color: "#fff" }}>Description</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    style={{
                      width: "100%",
                      padding: "10px",
                      backgroundColor: "#2c2c2c",
                      color: "#fff",
                      borderRadius: "5px",
                    }}
                  />
                </div>
                <div style={{ marginBottom: "15px" }}>
                  <label style={{ color: "#fff" }}>Price</label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                    style={{
                      width: "100%",
                      padding: "10px",
                      backgroundColor: "#2c2c2c",
                      color: "#fff",
                      borderRadius: "5px",
                    }}
                  />
                </div>
                <div style={{ marginBottom: "15px" }}>
                  <label style={{ color: "#fff" }}>Tags</label>
                  <input
                    type="text"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    required
                    style={{
                      width: "100%",
                      padding: "10px",
                      backgroundColor: "#2c2c2c",
                      color: "#fff",
                      borderRadius: "5px",
                    }}
                  />
                </div>
                <div style={{ marginBottom: "15px" }}>
                  <label style={{ color: "#fff" }}>Product Image</label>
                  <input
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                    style={{
                      width: "100%",
                      padding: "10px",
                      backgroundColor: "#2c2c2c",
                      color: "#fff",
                      borderRadius: "5px",
                    }}
                  />
                </div>
                <button
                  type="submit"
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#1e8e3f",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  {editingProduct ? "Update Product" : "Add Product"}
                </button>
                {editingProduct && (
                  <button
                    type="button"
                    onClick={resetForm}
                    style={{
                      padding: "10px 20px",
                      marginLeft: "10px",
                      backgroundColor: "#e74c3c",
                      color: "#fff",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Cancel
                  </button>
                )}
              </form>
              {message && <p style={{ color: "#e74c3c", marginTop: "10px" }}>{message}</p>}
            </div>
          </div>
        </div>

        {/* Product List */}
<div className="row mt-5">
  <div className="col-12">
    <h4 style={{ color: "#fff", textAlign: "center" }}>Product List</h4>
    <table className="table table-dark table-hover">
      <thead>
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Description</th>
          <th>Price</th>
          <th>Tags</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product._id}>
            {/* Product Image */}
                        <td>
                        {product.image ? (
                            <img
                            src={'http://127.0.0.1:3000/uploads/1732362648689.jpg'}
                            alt={product.name}
                            style={{
                                width: "80px",
                                height: "80px",
                                objectFit: "cover",
                                borderRadius: "5px",
                            }}
                            />
                        ) : (
                            <div
                            style={{
                                width: "80px",
                                height: "80px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: "#2c2c2c",
                                borderRadius: "5px",
                                color: "#fff",
                            }}
                            >
                            No Image
                            </div>
                        )}
                        </td>
                        {/* Other Product Details */}
                        <td>{product.name}</td>
                        <td>{product.description}</td>
                        <td>${product.price}</td>
                        <td>{product.tags}</td>
                        <td>
                        <button
                            onClick={() => handleEdit(product)}
                            style={{
                            marginRight: "10px",
                            backgroundColor: "#3498db",
                            color: "#fff",
                            padding: "5px 10px",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                            }}
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => handleDelete(product._id)}
                            style={{
                            backgroundColor: "#e74c3c",
                            color: "#fff",
                            padding: "5px 10px",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                            }}
                        >
                            Delete
                        </button>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
            </div>
      </div>
    </div>
  );
};

export default ManageProducts;
