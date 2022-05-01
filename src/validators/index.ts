import { ValidationSchema } from "express-validator";
/** common validator - start */
// id validator  
export const idValidator : ValidationSchema = {
    id: {
        notEmpty: true,
        isMongoId: {
            errorMessage: "Invalid id",
        },
        errorMessage: "Id is Required!",
    },
};
// userId validator 
export const userIdValidator : ValidationSchema = {
    user:{
        notEmpty: true,
        errorMessage: "User is Required!",
    }
}
// post validator 
export const postValidator : ValidationSchema = {
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
};
/** common validator - end */

/** new post validator */
export const newPostValidator : ValidationSchema = {
    ...postValidator,
    ...userIdValidator,
}

export const updatePostValidator : ValidationSchema = {
    ...idValidator,
    ...postValidator,
}