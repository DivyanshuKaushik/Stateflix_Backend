import { S3 } from "aws-sdk";
import sharp from "sharp";
import { config } from 'dotenv'
config()
// initialize and configure aws s3 instance
const s3 = new S3({
    accessKeyId: process.env.DK_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.DK_AWS_SECRET_ACCESS_KEY,
    region: process.env.DK_AWS_REGION,
});

/** upload image to AWS S3 */
export const uploadImage = (image: Buffer, name: string) => {
    config()
    return new Promise(async (resolve, reject) => {
        try {
            // optimize and convert image to webp format
            // fix aspect ratio and blur background image
            // const optimized_image = await sharp(image).webp().toBuffer();
            const size = 500;
            const resizedBuffer = await sharp(image).resize({width:size}).toBuffer()
            const optimized_image = await sharp(image).resize(size,size,{fit:'cover'}).blur(6).composite([{input:resizedBuffer,gravity:"center"}]).webp().toBuffer()
            // image name as webp extension
            const img_name = `${name}.webp`;
            // upload image to s3 bucket
            const upload = await s3
                .upload({
                    Bucket: process.env.DK_AWS_S3_BUCKET_NAME as string,
                    Body: optimized_image,
                    Key: img_name,
                    ContentType: "image/webp",
                    ACL: "public-read",
                })
                .promise();
            // return url of uploaded image
            return resolve(upload.Location);
        } catch (error) {
            console.log(error)
            return reject((error));
        }
    });
};
/** upload image to AWS S3 - end */

/** delete image from AWS S3 bucket */
export const deleteImage = (name: string) => {
    config()
    return new Promise(async (resolve, reject) => {
        try {
            const params = {
                Bucket: process.env.DK_AWS_S3_BUCKET_NAME as string,
                Key: name,
            };
            // delete image from bucket
            const remove = await s3.deleteObject(params).promise();
            if (!remove) {
                throw new Error("Error");
            }
            return resolve("Image Deleted Successfully!!");
        } catch (error) {
            return reject(Error("Error Deleting Image!!"));
        }
    });
};
/** delete image from AWS S3 bucket - end */