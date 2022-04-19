import multer from "multer";
import { dirname } from "path";
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log(file);
        cb(null, `${dirname(String(require.main?.filename))}/uploads/`);
    },

    filename: function (req: any, file: any, cb: any) {
        cb(null, file.originalname);
    },
});
// const storage = multer.memoryStorage();
const fileFilter = (req: any, file: any, cb: any) => {
    if (
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/png"
    ) {
        cb(null, true);
    } else {
        cb(new Error("Image uploaded is not of type jpg/jpeg or png"), false);
    }
};
const limits = {
    fileSize: 1024*1024*5,
}
const upload = multer({storage,fileFilter,limits});

export default upload