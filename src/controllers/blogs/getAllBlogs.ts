import { Request, Response } from "express";
import Blog from "../../models/blog.model";

const getAllblogs = async (req: Request, res: Response) => {
    try {
        const blogs = await Blog.find();
        return res.status(200).json(blogs);
    }
    catch (error) {
        return res.status(500).json({
            message: error instanceof Error ? error.message : 'Internal error while fetching the blogs',
            name: error instanceof Error ? error.name : '',
        })
    }
}


export default getAllblogs;