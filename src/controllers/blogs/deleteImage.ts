import { Request, Response } from "express";
import fs from 'fs';
import path from "path";
import Blog from "../../models/blog.model";



const deleteImageController = async (req: Request, res: Response) => {
    try {
        //blogImage/blogId=?&image=?
        const { blogId, image } = req.query;

        if (!blogId || !image)
            return res.status(403).json({
                message: 'Invalid payload',
                status: 403
            });




        let splitImage = image.toString().split('uploads/')[1];
        const pathToDeleteImage = path.join(__dirname, '..', '..', 'uploads', splitImage);


        // delete the image from the blog
        await Blog.findByIdAndUpdate(blogId, {
            $pull: { images: image }
        });

        fs.unlink(pathToDeleteImage, (error) => {
            if (error)
                return res.status(500).json({ message: 'The image has not been deleted', error });

            return res.status(200).json({ message: 'Image removed succesfully' });
        })

    }
    catch (error) {
        return res.status(500).json({ message: error instanceof Error ? error.message : 'Internal error' });
    }
}


export default deleteImageController;