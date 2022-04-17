import multer from "multer";

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         console.log(file);
//         cb(null, "./uploads/");
//     },

//     filename: function (req: any, file: any, cb: any) {
//         cb(null, file.originalname);
//     },
// });
const storage = multer.memoryStorage();
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

const upload = multer({storage: storage, fileFilter : fileFilter});

export default upload