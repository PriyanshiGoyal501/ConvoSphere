import multer from "multer";

// Configuring storage settings for multer
const storage =  multer.diskStorage({})

// Creating upload middleware using multer storage configuration
export const upload = multer({storage})
