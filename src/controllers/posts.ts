import { Request, Response } from "express";
import Article from "../models/Articles";
import { deleteImage, uploadImage } from "../utils/s3";

/** create new post controller - start  */
export const createPost = async (req: Request, res: Response) => {
    try {
        // check if image exists
        if (!req.file) {
            return res
                .status(400)
                .json({ errors: [{ msg: "Please upload an image" }] });
        }
        // destructure all fields from body request
        const { title, summary, date, category, type, user } = req.body;
        // create new article
        const article = new Article({
            title,
            summary,
            date,
            category,
            type,
            status: "unpublished",
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
        return res.status(201).json({
            status: 201,
            message: "Article created successfully",
            data: { article: saved, image: img_url },
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 500, error });
    }
};
/** create new post controller - end  */

/** update post controller - start  */
export const updatePost = async (req: Request, res: Response) => {
    try {
        // destructure all fields from body request
        const { id, title, summary, date, category, type } = req.body;
        // check if image exists
        if (req.file) {
            // delete old image from s3
            const img_key = "articles/" + id + ".webp";
            await deleteImage(img_key);
            // upload new image to s3
            await uploadImage(
                req.file?.buffer as Buffer,
                img_key.split(".")[0] as string
            );
        }
        // update article
        const updated = await Article.findByIdAndUpdate(id, {
            title,
            summary,
            date,
            category,
            type,
        });
        // send response back
        return res
            .status(200)
            .json({
                status: 200,
                message: "Article updated successfully",
                data: updated,
            });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 500, error });
    }
};

/** update post controller - end  */

/** delete post controller - start  */
export const deletePost = async (req: Request, res: Response) => {
    try {
        const { id } = req.params   // validate the req body
        const img_key = "articles/" + id + ".webp";
        // delete article image from s3 
        await deleteImage(img_key)
        // delete article from database 
        await Article.findByIdAndDelete(id)
        return res.status(200).json({status: 200, message: "Article deleted successfully"})
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 500, error });
    }
};
/** delete post controller - end  */

/** post status controller - start  */
export const updatePostStatus = async (req: Request, res: Response) => {
    try{
        const {id,status} = req.body
        const updated = await Article.findByIdAndUpdate(id, {status})
        return res.status(200).json({status: 200, message: "Article status updated successfully", data: updated})

    }catch(error){
        console.error(error);
        return res.status(500).json({ status: 500, error });
    }
}
/** post status controller - end  */

/** get all articles - Paginated API */
export const getAllArticles = async (req: Request, res: Response) => {
    try{
        const { page, limit } = req.query
        const pageNum = parseInt(page as string)
        const limitNum = parseInt(limit as string)
        const articles = await Article.find().sort({date: -1}).skip((pageNum - 1) * limitNum).limit(limitNum)
        return res.status(200).json({status: 200, message: "Articles fetched successfully", data: articles})
    }catch(error){
        console.error(error);
        return res.status(500).json({ status: 500, error });
    }
}
/** get all articles - end */

/** get all articles by category - Paginated API */
export const getArticlesByCategory = async (req: Request, res: Response) => {
    try{
        const { category, page, limit } = req.query
        const pageNum = parseInt(page as string)
        const limitNum = parseInt(limit as string)
        const articles = await Article.find({category}).sort({date: -1}).skip((pageNum - 1) * limitNum).limit(limitNum)
        return res.status(200).json({status: 200, message: "Articles fetched successfully", data: articles})

    }catch(error){
        console.error(error);
        return res.status(500).json({ status: 500, error });
    }
}
/** get all articles by category - end */

/** get single article */
export const getArticle = async (req: Request, res: Response) => {
    try{
        const {id} = req.params
        const article = await Article.findById(id)
        return res.status(200).json({status: 200, message: "Article fetched successfully", data: article})

    }catch(error){
        console.error(error);
        return res.status(500).json({ status: 500, error });
    }
}
/** get single article - end */