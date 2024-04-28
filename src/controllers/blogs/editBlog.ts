import { Request, Response } from "express";
import Blog from "../../models/blog.model";

const editBlog = async (req: Request, res: Response) => {
    try {
        console.log('Edit blog triggered');

        const { _id, title, subtitle, content } = req.body;

        // Check if _id is provided
        if (!_id) {
            return res.status(400).json({ message: 'Missing _id field in request body' });
        }

        // Find existing blog by _id
        const existingBlog = await Blog.findById(_id);

        // Check if blog exists
        if (!existingBlog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        // Update fields if provided, otherwise keep existing values
        const updatedFields: any = {};
        updatedFields.title = title || existingBlog.title;
        updatedFields.subtitle = subtitle || existingBlog.subtitle;
        updatedFields.content = content || existingBlog.content;

        // Update the existing blog with the updated fields
        await Blog.findByIdAndUpdate(_id, updatedFields);

        return res.status(200).json({ message: 'Blog updated successfully' });
    } catch (error) {
        console.error('Error editing blog:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export default editBlog;
