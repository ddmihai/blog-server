import { Request, Response } from "express";
import Blog from "../../models/blog.model";

const getBlogByIdController = async (req: Request, res: Response) => {
    try {
        const { blogId } = req.body;

        const blogData = await Blog.findById(blogId);
        return res.status(200).json(blogData);
    }

    catch (error) {
        return res.status(500).json(error);
    }
}


export default getBlogByIdController;