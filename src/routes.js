const express = require("express");
const multer = require("multer");
const multerConfig = require("./config/multer");

const routes = express.Router();

const BoxController = require("./controller/BoxController");
const FileController = require("./controller/FileController");
const UserController = require("./controller/UserController");
const SessionController = require("./controller/SessionController");
const authMiddleware = require('./middlewares/auth');

routes.post("/users", UserController.store);
routes.post("/sessions", SessionController.store);



routes.use(authMiddleware);

routes.post("/boxes", BoxController.store);
routes.get("/boxes/:id", BoxController.show);

routes.post(
  "/boxes/:id/files",
  multer(multerConfig).single("file"),
  FileController.store
);



module.exports = routes;
