import { Request, Response } from "express";
import Blog from "../../models/blog.model";
import { isValidObjectId } from "mongoose";

const createBlogController = async (req: Request, res: Response) => {
    try {
        const { title, subtitle, category } = req.body;

        if (!category || !isValidObjectId(category))
            return res.status(401).json({ message: 'A valid category id is required' });

        const newBlog = new Blog({ title, subtitle, category });
        let responseNewBlog = await newBlog.save();

        return res.status(201).json({
            message: 'Blog created. You can add content and images by editing the existing blog',
            newBlog
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error instanceof Error ? error.message : 'Error while creating a blog. Please checkout the create route controller!',
            name: error instanceof Error ? error.name : ''
        });
    }
}


export default createBlogController;