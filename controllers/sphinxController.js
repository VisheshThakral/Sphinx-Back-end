const asyncWrapper = require("../utils/async");
const Sphinx = require("../models/Sphinx");
const { getUserId } = require("../helpers/jwt_helper");
const { Storage } = require("@google-cloud/storage");

const createSphinx = asyncWrapper(async (req, res) => {
  // Extract user ID from the authorization token
  const token = req.headers["authorization"].split(" ")[1];
  const userId = getUserId(token);

  // Create a new Sphinx with the provided data and user ID
  const sphinx = await Sphinx.create({ ...req.body, userId });

  // Return the created Sphinx in the response
  res.status(201).json({ sphinx });
});

const uploadImage = asyncWrapper(async (req, res) => {
  const storage = new Storage({ keyFilename: "./sphinx-cloud-storage.json" });
  const bucket = storage.bucket("sphinx-images");
  const userImage = req.body.userImage;
  console.log(req.body)
  const destination = `images/vishesh.jpg`; // Replace with the desired destination path in the bucket.

  bucket
    .upload(userImage, {
      destination: destination,
      // Optional metadata for the file.
      metadata: {
        contentType: "image/jpeg", // Set the content type based on your image type.
      },
    })
    .then((file) => {
      res.send(`Image uploaded to ${file.name}`);
    })
    .catch((err) => {
      console.log(err);
      res.send("Error uploading image:");
    });
});

module.exports = {
  createSphinx,
  uploadImage,
};
