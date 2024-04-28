import { Request, Response } from "express";
import Blog from "../../models/blog.model";


const completeBlog = async (req: Request, res: Response) => {
    try {
        const { blogId, content } = req.body;

        await Blog.findByIdAndUpdate(blogId, { content });
        return res.status(200).json({ message: 'Blog updated' });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

export default completeBlog