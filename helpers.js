
const UploadDIR = `${__dirname}/public/uploads`;
const fs = require('fs');

function createUploadDirIfNotExists() {
  if (!fs.existsSync(UploadDIR)) {
    fs.mkdirSync(UploadDIR);
  }
}

module.exports = {
  UploadDIR,
  createUploadDirIfNotExists,
}
