import { Request, Response } from "express";
import {Types} from "mongoose";
import Category from "../models/Category";
import Posts from "../models/Posts";
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
        const { title, content, category, user,tags,source,publisher } = req.body;
        // create new post
        const post = new Posts({
            title:title.trim(),
            content:content.trim(),
            category,
            tags:JSON.parse(tags),
            source,
            status: "unpublished",
            user,
            publisher
        });
        // save post to database
        const saved = await post.save();
        // upload image to s3
        // image is as req.file - img_name is as folder/postID.webp
        const img_name = `posts/${saved._id}`;
        const img_url = await uploadImage(
            req.file?.buffer as Buffer,
            img_name as string
        );
        await Posts.findByIdAndUpdate(saved._id, { image: img_url });
        // send response back
        return res.status(201).json({
            status: 201,
            message: "Post created successfully",
            data: { post: saved, image: img_url },
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
        const { id, title, content, category, source,tags,publisher } = req.body;
        // check if image exists
        if (req.file) {
            // delete old image from s3
            const img_key = "posts/" + id + ".webp";
            await deleteImage(img_key);
            // upload new image to s3
            await uploadImage(
                req.file?.buffer as Buffer,
                img_key.split(".")[0] as string
            );
        }
        // update Posts
        const updated = await Posts.findByIdAndUpdate(id, {
            title,
            content,
            category,
            source,tags:JSON.parse(tags),publisher
        });
        // send response back
        return res.status(200).json({
            status: 200,
            message: "Post updated successfully",
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
        const { id } = req.params;
        const img_key = "posts/" + id + ".webp";
        // delete Posts image from s3
        await deleteImage(img_key);
        // delete Posts from database
        await Posts.findByIdAndDelete(id);
        return res
            .status(200)
            .json({ status: 200, message: "Post deleted successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 500, error });
    }
};
/** delete post controller - end  */

/** post status controller - start  */
export const updatePostStatus = async (req: Request, res: Response) => {
    try {
        const {id,status} = req.body
        console.log(status,id)
        const updated = await Posts.findByIdAndUpdate(id, { status });
        return res
            .status(200)
            .json({
                status: 200,
                message: "Post status updated successfully",
                data: updated,
            });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 500, error });
    }
};
/** post status controller - end  */

/** get all published Posts - Paginated API */
export const getPosts = async (req: Request, res: Response) => {
    try {
        let { categories,publishers, page, limit } = req.query;
        const pageNum = parseInt(page as string);
        const limitNum = parseInt(limit as string);
        let totalCount;
        let posts;
        // get post by categories 
        if(categories){
            categories = (categories as String).split(",");
            posts = await Posts.find({status:"published",category:{ $in: categories }})
                .sort({ 'updatedAt': -1 })
                .skip((pageNum - 1) * limitNum)
                .limit(limitNum).populate("user");
            totalCount = await Posts.countDocuments({status:"published",category:{ $in: categories }});
        }
         // get post by publisher 
        else if(publishers){
            publishers = (publishers as String).split(",");
            posts = await Posts.find({status:"published",publisher:{ $in: publishers }})
                .sort({ 'updatedAt': -1 })
                .skip((pageNum - 1) * limitNum)
                .limit(limitNum).populate("user");
            totalCount = await Posts.countDocuments({status:"published",publisher:{ $in: publishers }});
        }
         // get all post by default
        else{
            posts = await Posts.find({status:"published"})
            .sort({ 'updatedAt': -1 })
            .skip((pageNum - 1) * limitNum)
            .limit(limitNum).populate("user");
            totalCount = await Posts.countDocuments({status:"published"});
        }
        return res
            .status(200)
            .json({
                status: 200,
                message: "Posts fetched successfully",
                totalCount,
                data: posts,
            });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 500, error });
    }
};
/** get all published Posts - end */

/** get single published Posts */
export const getPost = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const post = await Posts.findOne({_id:id,status:"published"});
        return res
            .status(200)
            .json({
                status: 200,
                message: "Post fetched successfully",
                data: post,
            });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 500, error });
    }
};
/** get single published Posts - end */
export const getUnpublishedPosts = async (req: Request, res: Response) => {
    try {
        const { page, limit } = req.query;
        const pageNum = parseInt(page as string);
        const limitNum = parseInt(limit as string);
        const posts = await Posts.find({status:"unpublished"}).sort({ 'updatedAt': -1 })
            .skip((pageNum - 1) * limitNum)
            .limit(limitNum).populate("user category publisher");
        return res
            .status(200)
            .json({
                status: 200,
                message: "Posts fetched successfully",
                data: posts,
            });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 500, error });
    }
};
/** get all unpublished Posts */

/** get all posts by user */
export const getUserPosts =async (req: Request, res: Response) => {
    try{
        const { user } = req.params
        const { page, limit } = req.query;
        const pageNum = parseInt(page as string);
        const limitNum = parseInt(limit as string);
        const posts = await Posts.find({user})
            .sort({ 'updatedAt': -1 })
            .skip((pageNum - 1) * limitNum)
            .limit(limitNum).populate("user category publisher");
        return res
            .status(200)
            .json({
                status: 200,
                message: "Posts fetched successfully",
                data: posts,
            });

        // mongoose aggregate user and find all posts of user and group by status
        // const posts = await Posts.aggregate([
        //     {
        //         $match: {
        //             user: new Types.ObjectId(user),
        //         }
        //     },
        //     {$sort: { updatedAt: -1 }},
        //     {$skip: (parseInt(page as string) - 1) * parseInt(limit as string)},
        //     {$limit: parseInt(limit as string)},

        // ])
        // const posts = await Posts.find({user}).populate("user","name email")
        // res.status(200).json(posts);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 500, error });
    }
};


