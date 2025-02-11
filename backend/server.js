const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(`mongodb+srv://anwarfarhan339:cannonx100@cluster0.hj4gw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const ImageSchema = new mongoose.Schema({
  title: String,
  url: String,
  price: Number,
});
const Image = mongoose.model("Image", ImageSchema);

// Add a new image
app.post("/api/images", async (req, res) => {
  const { title, url, price } = req.body;
  try {
    const newImage = new Image({ title, url, price });
    await newImage.save();
    res.status(201).json(newImage);
  } catch (error) {
    res.status(500).json({ message: "Error adding image" });
  }
});

// Get all images
app.get("/api/images", async (req, res) => {
  try {
    const images = await Image.find();
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: "Error fetching images" });
  }
});

// Update an image
app.put("/api/images/:id", async (req, res) => {
  const { title, url, price } = req.body;
  try {
    const updatedImage = await Image.findByIdAndUpdate(
      req.params.id,
      { title, url, price },
      { new: true }
    );
    res.json(updatedImage);
  } catch (error) {
    res.status(500).json({ message: "Error updating image" });
  }
});

// Delete an image
app.delete("/api/images/:id", async (req, res) => {
  try {
    await Image.findByIdAndDelete(req.params.id);
    res.json({ message: "Image deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting image" });
  }
});

app.listen(5001, () => console.log("Admin dashboard backend running on port 5001"));
