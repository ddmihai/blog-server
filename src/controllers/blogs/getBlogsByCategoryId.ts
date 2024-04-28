import { Request, Response } from "express";
import Blog from "../../models/blog.model";


const getBlogsByCategoryId = async (req: Request, res: Response) => {
    try {
        const { categoryId } = req.body;

        const blogsList = await Blog.find({ category: categoryId });
        return res.status(200).json(blogsList)
    }

    catch (error) {
        return res.status(500).json(error);
    }
}


export default getBlogsByCategoryId;