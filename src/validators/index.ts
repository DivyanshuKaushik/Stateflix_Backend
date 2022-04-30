import { ValidationSchema } from "express-validator";
/**  new post validator - start */
export const newPostValidator : ValidationSchema = {
    title: {
        notEmpty: true,
        isLength:{
            options:{min:5,max:30},
            errorMessage: "Title must be between 5 and 30 characters"
        },
        errorMessage: "Title is Required!",
    },
    summary: {
        notEmpty: true,
        isLength:{
            options:{min:10,max:80},
            errorMessage: "Summary must be between 10 and 80 characters"
        },
        errorMessage: "Summary is Required!",
    },
    category:{
        notEmpty: true,
        errorMessage: "Category is Required!",
    },
    type:{
        notEmpty: true,
        errorMessage: "Type is Required!",
    },
    user:{
        notEmpty: true,
        errorMessage: "User is Required!",
    }
};
/**  new post validator - end */
/** id validator - start */
export const idValidator : ValidationSchema = {
    id: {
        notEmpty: true,
        isMongoId: {
            errorMessage: "Invalid id",
        },
        errorMessage: "Id is Required!",
    },
};
/** id validator - end */