const multer = require('multer');


const storage = multer.diskStorage({
    destination: process.env.fileLocation,
    filename: (req: Express.Request, file: Express.Multer.File, callback: (error: (Error | null), filename: string) => void) => {
        callback(null, Date.now() + "-" + file.originalname)
    }
});

const tempStorage = multer.diskStorage({
    destination: process.env.tempFileLocation,
    filename: (req: Express.Request, file: Express.Multer.File, callback: (error: (Error | null), filename: string) => void) => {
        callback(null, Date.now() + "-" + file.originalname)
    }

});
const upload = multer({storage: storage});
const tempUpload = multer({storage: tempStorage});
const fields = multer();

export {upload, tempUpload, fields}
