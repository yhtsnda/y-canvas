/**
 * config
 */

var path = require('path');

exports.config = {
  db: 'mongodb://127.0.0.1/yunyou_v1',
  host: 'http://localhost.yunyou.com',
  port: 5746,
  session_secret: 'robbin&cherry',
  upload_dir: path.join(__dirname, 'public', 'user_data', 'images'),
  uploadTypes: {
    //"html": "text/html",
    //"jpeg": "image/jpeg",
    "image/jpeg": "jpg",
    "image/png": "png"//,
    //"js": "text/javascript",
    //"css": "text/css",
    //"mp3": "audio/mpeg",
    //"ogg": "audio/ogg"
  },
  imageSizes: {
    s: [100, 100],
    m: [500, 500],
    l: [1000, 1000]
  }
};