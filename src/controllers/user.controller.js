import UserModel from "../models/user.model.js";
import ProductModel from "../models/product.model.js";

export default class UserController {
  getRegister(req, res, next) {
    res.render("register");
  }
  getLogin(req, res, next) {
    res.render("login", { errorMessage: null });
  }

  storeCredential(req, res, next) {
    const { name, email, password } = req.body;
    UserModel.add(name, email, password);
    console.log(name, email, password);
    res.render("login", { errorMessage: null });
  }

  postLogin(req, res, next) {
    const { email, password } = req.body;
    console.log(email, password);
    const validUser = UserModel.isValid(email, password);
    if (!validUser) {
      return res.render("login", { errorMessage: "Invalid Credential" });
    }
    req.session.userEmail = email;
    const products = ProductModel.get();
    res.render("products", {
      products: products,
      userEmail: req.session.userEmail,
    });
  }

  logout(req, res, next) {
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
        return;
      } else {
        res.redirect("/login");
      }
    });
    // to delete the cookie
    res.clearCookie("lastVisit");
  }
}
