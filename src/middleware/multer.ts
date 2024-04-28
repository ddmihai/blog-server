import multer from 'multer';
import { Request } from 'express';
import path from 'path';





const pathImage = path.join(__dirname, '..', 'uploads');




// Define the storage configuration
const storage = multer.diskStorage({
    destination: function (req: Request, file, cb) {
        cb(null, pathImage);
    },

    // File name config
    filename: function (req: Request, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});



// Define the file filter
const fileFilter = (req: Request, file: any, cb: multer.FileFilterCallback) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

// Create a Multer instance with the storage and file filter
const upload = multer({ storage: storage, fileFilter: fileFilter });

export default upload;
