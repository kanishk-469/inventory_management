// 2 approaches i can follow CommonJS OR es6 modules

import path from "path";
import ProductModel from "../models/product.model.js";

export default class ProductController {
  getProducts(req, res) {
    const products = ProductModel.get();
    // console.log(products);
    console.log(path.resolve());

    return res.render("products", {
      products: products,
      userEmail: req.session.userEmail,
    });
    // return res.sendFile(
    //   path.join(path.resolve(), "src", "views", "products.ejs")
    // ); // used for static html file to send to client side
  }

  getAddForm(req, res) {
    return res.render("new-product", {
      errorMessage: null,
      userEmail: req.session.userEmail,
    });
  }

  addNewProduct(req, res) {
    //create middleware folder inside src folder then do validation

    // /************Form data Validation Starts************************/
    // /*****************Voilation of SRP of Controller****************/
    // console.log(req.body); // after adding to index.js entry file this line
    // //server.use(express.urlencoded({extended:true}));
    // const { name, price, imageUrl } = req.body;
    // imageUrl.trim();
    // const errors = [];

    // if (!name || name.trim() == " ") {
    //   errors.push("Name is required!");
    // }
    // if (!price || parseFloat(price) < 1) {
    //   errors.push("Price must be a positive value");
    // }
    // try {
    //   const validURL = new URL(imageUrl); // Validate URL
    // } catch (err) {
    //   errors.push("URL is invalid");
    // }

    // if (errors.length > 0) {
    //   return res.render("new-product", { errorMessage: errors[0] });
    // }
    // /************FORM DATA Validation ends************************/
    const { name, desc, price } = req.body;
    const imageUrl = "images/" + req.file.filename;
    // ProductModel.add(req.body);
    ProductModel.add(name, desc, price, imageUrl);
    const products = ProductModel.get();
    return res.render("products", {
      products: products,
      userEmail: req.session.userEmail,
    });
  }

  updateProductView(req, res, next) {
    //if product exists then return view
    const id = Number(req.params.id);
    const productFound = ProductModel.getById(id);

    if (productFound) {
      res.render("update-product", {
        product: productFound,
        errorMessage: null, // Explicitly setting to null for clarity
      });
    } else {
      res.status(404).send("Product not found"); // Handling the case where the product is not found
    }
  }

  updateProduct(req, res) {
    ProductModel.update(req.body);
    const products = ProductModel.get();
    return res.render("products", {
      products: products,
      userEmail: req.session.userEmail,
    });
  }

  deleteProduct(req, res) {
    const id = Number(req.params.id);
    const productFound = ProductModel.getById(id);

    if (!productFound) {
      return res.status(401).send("Product not found opps!!");
    }
    ProductModel.delete(id);
    const products = ProductModel.get();
    return res.render("products", {
      products: products,
      userEmail: req.session.userEmail,
    });
  }
}
