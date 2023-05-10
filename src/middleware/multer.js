const multer = require('multer');

const productStorage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './src/public/images/products');
  },
  filename: function(req, file, cb) {
    cb(null,Date.now() + '_' + file.originalname);
  }
});

const blogStorage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './src/public/images/blogs');
  },
  filename: function(req, file, cb) {
    cb(null,Date.now() + '_' + file.originalname);
  }
});

const storeStorage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './src/public/images/stores');
  },
  filename: function(req, file, cb) {
    cb(null,Date.now() + '_' + file.originalname);
  }
});

const productUpload = multer({ storage: productStorage });
const blogUpload = multer({ storage: blogStorage });
const storeUpload = multer({ storage: storeStorage });

module.exports = {
  productUpload,
  blogUpload,
  storeUpload,
};
