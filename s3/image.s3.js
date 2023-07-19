const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
require('dotenv').config();

AWS.config.update({
  accessKeyId: process.env.ACCESSKEY,
  secretAccessKey: process.env.SECRETACCESSKEY,
  region: 'ap-northeast-2',
});

const upload = multer({
  //* 저장공간
  // s3에 저장
  storage: multerS3({
    // 저장 위치
    s3: new AWS.S3(),
    bucket: 'tome1',
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key(req, file, cb) {
      cb(null, `${Date.now()}_${path.basename(file.originalname)}`); // original 폴더안에다 파일을 저장
    },
  }),
  //* 용량 제한
  limits: { fileSize: 5 * 1024 * 1024 },
});
module.exports = { upload };
