import { Request, Response } from "express";
import { validationResult } from "express-validator";
import Article from "../models/Articles";
import { uploadImage } from "../utils/s3";

/** create new post controller - start  */
export const createPost = async (req: Request, res: Response) => {
    try {
        // validate the req body 
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        }
        // check if image exists 
        if (!req.file) {
            return res.status(400).json({ errors: [{ msg: "Please upload an image" }] });
        }
        // destructure all fields from body request
        const { title, summary, date, category, type, status, user } = req.body;
        // create new article 
        const article = new Article({
            title,
            summary,
            date,
            category,
            type,
            status,
            user,
        });
        // save article to database
        const saved = await article.save();
        // upload image to s3
        // image is as req.file - img_name is as folder/articleID.webp
        const img_name = `articles/${saved._id}`;
        const img_url = await uploadImage(
            req.file?.buffer as Buffer,
            img_name as string
        );
        await Article.findByIdAndUpdate(saved._id, { image: img_url });
        // send response back 
        return res
            .status(201)
            .json({
                status: 201,
                message: "Article created successfully",
                data: { article: saved, image: img_url },
            });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 500, error });
    }
};
/** create new post controller - end  */

/** update post controller - start  */

/** update post controller - end  */

/** delete post controller - start  */

/** delete post controller - end  */

/** post status controller - start  */

/** post status controller - end  */