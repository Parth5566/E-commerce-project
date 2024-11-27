const express = require('express');
const router = express.Router();
const Images = require('../models/UserProfile'); // Ensure model schema matches requirements
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

let files = [];
let fileInArray = [];

//~<--------------------STORAGE for IMAGE------------------>

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads"); // Directory for storing uploaded images
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const id = uuidv4();
    const filePath = `${id}${ext}`;
    
    fileInArray.push(filePath); // Store each file path
    cb(null, filePath);
  }
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (["image/png", "image/jpg", "image/jpeg"].includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only .png, .jpg, and .jpeg formats allowed!'), false);
    }
  }
});

//^<---------------Get images--------------------->
router.get('/findimg', (req, res) => {
  Images.find()
    .then(img => res.json(img))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

//^<---------------Post images--------------------->
router.post('/add', upload.array("uploaded_Image", 5), (req, res) => {
  const user = req.headers['user']; // Retrieves 'User' from headers, assuming it's stored in local storage on client side
  const newImage = new Images({
    User: user,
    name: req.body.name,
    uploaded_Image: fileInArray
  });

  newImage.save()
    .then(() => {
      res.json("Profile picture uploaded successfully!");
      console.log("Image POST success");

      // Clear the arrays after successful save
      files = [];
      fileInArray = [];
    })
    .catch(err => {
      console.error(`Error: ${err}`);
      res.status(500).json({ error: 'Failed to upload profile picture.' });
    });
});

module.exports = router;
