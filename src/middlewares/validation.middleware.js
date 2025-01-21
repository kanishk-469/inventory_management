import { body, validationResult } from "express-validator";

/************ Form Data Validation Starts ************************/
const addNewProductValidation = async (req, res, next) => {
  /***** Validating using express-validator library starts *****/
  console.log("Incoming form data:", req.body);

  // 1. Setup rules for validation.
  const rules = [
    body("name")
      .trim()
      .notEmpty()
      .withMessage("Name is required")
      .isLength({ min: 3 })
      .withMessage("Name must be at least 3 characters long"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price must be a positive value"),
    // body("imageUrl").trim().isURL().withMessage("Invalid URL format for image"),
    // using express- validator
    body("imageUrl").custom((value, { req }) => {
      if (!req.file) {
        throw new Error("Image is required");
      }
      return true;
    }),
  ];

  // 2. Run the rules.
  await Promise.all(rules.map((rule) => rule.run(req)));

  // 3. Check for validation errors.
  const validationErrors = validationResult(req);

  // Log errors if any
  if (!validationErrors.isEmpty()) {
    console.error("Validation Errors:", validationErrors.array());

    // Render the form with the first error message
    return res.status(400).render("new-product", {
      errorMessage: validationErrors.array()[0].msg,
    });
  }

  /***** Validating using express-validator library ends *****/

  next(); // Proceed to the next middleware or route handler
};

/************ Form Data Validation Ends ************************/

export default addNewProductValidation;
