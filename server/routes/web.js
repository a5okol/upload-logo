// const path = require('path');
const express = require("express");
const multer = require("multer");
const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets/uploads");
    },
    filename: function (req, file, cb) {
        // cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
        cb(null, file.originalname);
    },
});

var upload = multer({ storage: storage });

// Upload Image
router.post("/public/photo", upload.single("photo"), (req, res, next) => {
    return res.json({
        image: req.file.path,
    });
});

module.exports = router;
