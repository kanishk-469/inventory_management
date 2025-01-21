import multer from "multer";

/// configure our file name and destination
const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/");
  },
  filename: (req, file, cb) => {
    const name = Date.now() + "-" + file.originalname;
    cb(null, name);
  },
});

// export as well as created multer instance
export const uploadFile = multer({ storage: storageConfig });

// we will append current date and time stamp to filename
// to make unique names before storing.
