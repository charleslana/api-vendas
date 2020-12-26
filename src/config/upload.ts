import path from "path";
import multer from "multer";
import * as crypto from "crypto";
import AppError from "../shared/errors/AppError";

const uploadFolder = path.resolve(__dirname, '..', '..', 'uploads');

export default {
    directory: uploadFolder,
    storage: multer.diskStorage({
        destination: uploadFolder,
        filename(request, file, callback) {

            if(file.mimetype != 'image/jpeg' && file.mimetype != 'image/jpg' && file.mimetype != 'image/png') {
                return callback(new AppError('Invalid format image.'),'');
            }

            const fileHash = crypto.randomBytes(10).toString('hex');

            const filename = `${fileHash}-${file.originalname}`;

            callback(null, filename);
        }
    }),
    limits: {
        fileSize: 1024 * 1024,
        files: 1
    }
}