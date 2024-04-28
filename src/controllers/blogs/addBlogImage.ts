import { Request, Response } from "express";
import Blog from "../../models/blog.model";
import { isValidObjectId } from "mongoose";


const addBlogImageCOntroller = async (req: Request, res: Response) => {
    try {
        const { blogId } = req.body;


        if (!isValidObjectId(blogId))
            return res.status(400).json({ error: 'Invalid blog id' });


        const blogRequired = await Blog.findOne({ _id: blogId });

        if (!blogRequired)
            return res.status(400).json({ error: 'Blog not found' });


        if (!req.file)
            return res.status(400).json({ error: 'No file uploaded' });

        // Create image link for creating the image reference
        const imageURL = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

        await Blog.findByIdAndUpdate(blogId, {
            $push: { images: imageURL }
        });

        let blogImages = await Blog.findById(blogId).select('images');


        return res.status(201).json(blogImages);
    }
    catch (error) {
        res.send(error)
    }
}

export default addBlogImageCOntroller;