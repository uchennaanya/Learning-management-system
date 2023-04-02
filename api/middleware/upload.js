const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    const dir = "uploads/exam";
    !fs.existsSync(dir) && fs.mkdirSync(dir, { recursive: true });
    callback(null, dir);
  },
  filename: (req, file, callback) => {
    const extension = file.originalname.split(".").pop();
    callback(null, `${file.originalname}-${Date.now()}.${extension}`);
  },
});

const maxSize = 1024 * 1024 * 5; // 5MB
const upload = multer({
  storage,
  limits: {
    fileSize: maxSize, // 5MB
  },
  fileFilter: (req, file, callback) => {
    // Only accept pdf and docx files
    if (
      file.mimetype !== "application/pdf" &&
      file.mimetype !== "application/msword" &&
      file.mimetype !==
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      return callback(new Error("Only pdf and docx files are allowed!"));
    }
    callback(null, true);
  },
});

module.exports = upload;
