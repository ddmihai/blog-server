import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    categoryName: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },

    categoryDescription: {
        type: String,
        required: true,
        trim: true
    }
})


const Category = mongoose.model('Category', categorySchema);
export default Category;