const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cd(null, "public/images");
  },

  filename: (req, file, cb) => {
    console.log(req);
    console.log(flie);

    cb(
      null,
      new Date().getTime() +
        "" +
        Math.round(Math.random() * 10000000000) +
        "." +
        file.mimetype.split("/")[1]
    );
  }
});

module.exports = multer({ storage: storage });
