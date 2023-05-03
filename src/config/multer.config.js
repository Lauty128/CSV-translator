import multer from "multer";
import path from 'path';
import * as url from 'url';

//---- Config
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../download"))
    },
    filename: (req, file, cb) => {
        cb(null, 'fileToRead.csv')
    }
})

const upload = multer({
    storage,
    limits: { fileSize: 2000 },
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "text/csv") cb(null, true);
        else {
            cb(null, false);
            return cb(new Error('Only .csv format allowed!'));
        }
    }
})

export default upload