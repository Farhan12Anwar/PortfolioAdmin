import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({ title: "", url: "", price: "" });

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    const response = await axios.get("http://localhost:5001/api/images");
    setImages(response.data);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5001/api/images", formData);
    fetchImages();
    setFormData({ title: "", url: "", price: "" });
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5001/api/images/${id}`);
    fetchImages();
  };

  return (
    <div className="admin-dashboard">
      <h1 className="dashboard-title">Admin Dashboard</h1>
      <motion.form 
        className="form-container"
        onSubmit={handleSubmit}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="url"
          placeholder="Image URL"
          value={formData.url}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleInputChange}
          required
        />
        <button className="submit-button" type="submit">
          Add Image
        </button>
      </motion.form>

      <div className="image-grid">
        {images.map((image) => (
          <motion.div
            key={image._id}
            className="image-card"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <img src={image.url} alt={image.title} className="image-item" />
            <h2>{image.title}</h2>
            <p>Price: ₹{image.price}</p>
            <button className="delete-button" onClick={() => handleDelete(image._id)}>
              Delete
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
