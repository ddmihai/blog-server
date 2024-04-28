import mongoose, { Types } from "mongoose";

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true
    },

    subtitle: {
        type: String,
        trim: true,
    },

    content: {
        type: String,
        trim: true
    },

    category: {
        type: Types.ObjectId,
        ref: 'Category'
    },

    images: {
        type: [String],
    }
});


const Blog = mongoose.model('Blog', blogSchema);
export default Blog;