// This file is just a Entry point of project.
// Using Express FW we create Server
import express from "express";
import ProductController from "./src/controllers/product.controller.js";
import UserController from "./src/controllers/user.controller.js";
import path from "path";
import expressEjsLayouts from "express-ejs-layouts";
import addNewProductValidation from "./src/middlewares/validation.middleware.js";
import { uploadFile } from "./src/middlewares/file-upload-middleware.js";
import session from "express-session";
import { auth } from "./src/middlewares/auth.session.middleware.js";
import cookieParser from "cookie-parser";
import { setLastVisit } from "./src/middlewares/lastVisit.middleware.js";

const server = express();

//Intercept request, coming from client, job of cookie parser,
//is to take cookie from res and add to req stream
server.use(cookieParser());
server.use(setLastVisit);

// To tell express MVC application that i am using JS here
server.use(express.static("public"));

///configuration of session
server.use(
  session({
    secret: "axeheh3jddn211",
    saveUninitialized: true,
    resave: false,
    cookie: { secure: false },
  })
);

//we need to tell express server that i am using ejs View Engine/Te
// mplate Engine
server.set("view engine", "ejs");
server.set("views", path.join(path.resolve(), "src", "views"));

// It's a middleware
server.use(expressEjsLayouts);

// // middleware added
// server.get("/", (req, res) => {
//   res.send("Welcome to the Inventory Management App");
// });

// server.use(express.static("public"));

///Using middleware added parse form data, telling express to parse form
// data which is coming from url
server.use(express.urlencoded({ extended: true }));

// creating an instance/object from class
const productController = new ProductController();
const userController = new UserController();

server.get("/register", userController.getRegister);
server.get("/login", userController.getLogin);

server.post("/register", userController.storeCredential);
server.post("/login", userController.postLogin);

//send response from controller
server.get("/", auth, productController.getProducts);
server.get("/new", auth, productController.getAddForm);

server.get("/update-product/:id", auth, productController.updateProductView);
server.post("/update-product", auth, productController.updateProduct);

server.get("/logout", userController.logout);

server.post("/delete-product/:id", auth, productController.deleteProduct);

///Middleware extra added for form data Validation
server.post(
  "/",
  uploadFile.single("imageUrl"),
  addNewProductValidation,
  productController.addNewProduct
);

// server.use(express.static("src/views"));

server.listen(3300, () => {
  console.log("Server is listening at port 3300!");
});
