const express = require("express");
const app = express();
const cors = require("cors");
const database = require("./config/db.config");
const sphinxRoutes = require("./routes/sphinxRoutes");
const userRoutes = require("./routes/userRoutes");
const notFound = require("./utils/not-found");
const errorHandler = require("./utils/error-handler");

require("dotenv").config();
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
  })
);
app.use((req, res, next) => {
  res.setHeader('Access-Control-Expose-Headers', 'Authorization');
  next();
});
app.use(express.json());
app.use("/user", userRoutes);
app.use("/sphinx", sphinxRoutes);
app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT;

const start = async () => {
  try {
    (async function db() {
      await database(process.env.MONGO_URI);
    })();
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
