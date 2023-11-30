const path = require('path'); // Core package
const multer = require('multer'); // External package
const uuid = require('uuid'); // External package

function getTargetImageStorage(address) {
    return multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, `./uploads/${address}`);
        },
        filename: function(req, file, cb){
            console.log(file);
            const extension = path.parse(file.originalname).ext;
            const random_name = uuid.v4() + extension;
    
            cb(null, random_name);
        },
    });
}

const makeUploader = (address) => {
    const storage = getTargetImageStorage(address);
    return multer({ storage: storage });
}

module.exports = makeUploader;