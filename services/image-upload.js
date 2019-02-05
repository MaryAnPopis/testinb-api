const multer = require("multer");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");

const BUCKET_NAME = process.env.BUCKET_NAME;
const IAM_USER_KEY = process.env.Access_Key_ID;
const IAM_USER_SECRET = process.env.Secret_Access_Key;
const BUCKET_REGION = process.env.BUCKET_REGION;

aws.config.update({
  secretAccessKey: IAM_USER_SECRET,
  accessKeyId: IAM_USER_KEY,
  region: BUCKET_REGION // region of your bucket
});

const s3 = new aws.S3();

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: BUCKET_NAME,
    acl: "public-read",
    metadata: function(req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function(req, file, cb) {
      cb(null, `${Date.now().toString()}_${file.originalname}`);
    }
  })
});

module.exports = upload;
