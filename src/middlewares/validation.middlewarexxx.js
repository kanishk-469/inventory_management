import { body, validationResult } from "express-validator";
/************Form data Validation Starts************************/
const addNewProductValidation = async (req, res, next) => {
  /*****Validating using express-validator library starts***/
  // Steps to follow
  console.log(req.body);
  //1. setup rules for validation.
  const rules = [
    body("name").notEmpty().withMessage("Name is required"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price should be positive value"),
    body("imageUrl").isURL().withMessage("Invalid Url"),
  ];
  //2.run those rules.
  await Promise.all(
    rules.map((rule) => {
      rule.run(req);
    })
  );
  //3.check if there are any errors, after running those rules.
  const validationErrors = validationResult(req);
  console.log(validationErrors);

  //4. if errors, return the error message.
  if (!validationErrors.isEmpty()) {
    return res.render("new-product", {
      errorMessage: validationErrors.array()[0].msg,
    });
  }

  /*****Validating using express-validator library ends***/

  //     console.log(req.body); // after adding to index.js entry file this line
  //   //server.use(express.urlencoded({extended:true}));
  //   const { name, price, imageUrl } = req.body;
  //   imageUrl.trim();
  //   const errors = [];

  //   if (!name || name.trim() == " ") {
  //     errors.push("Name is required!");
  //   }
  //   if (!price || parseFloat(price) < 1) {
  //     errors.push("Price must be a positive value");
  //   }
  //   try {
  //     const validURL = new URL(imageUrl); // Validate URL
  //   } catch (err) {
  //     errors.push("URL is invalid");
  //   }
  //   if (errors.length > 0) {
  //     return res.render("new-product", { errorMessage: errors[0] });
  //   }

  next(); // move to next middleware
};
/************FORM DATA Validation ends************************/

export default addNewProductValidation;
