"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const blog_model_1 = __importDefault(require("../../models/blog.model"));
const editBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('Edit blog triggered');
        const { _id, title, subtitle, content } = req.body;
        // Check if _id is provided
        if (!_id) {
            return res.status(400).json({ message: 'Missing _id field in request body' });
        }
        // Find existing blog by _id
        const existingBlog = yield blog_model_1.default.findById(_id);
        // Check if blog exists
        if (!existingBlog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        // Update fields if provided, otherwise keep existing values
        const updatedFields = {};
        updatedFields.title = title || existingBlog.title;
        updatedFields.subtitle = subtitle || existingBlog.subtitle;
        updatedFields.content = content || existingBlog.content;
        // Update the existing blog with the updated fields
        yield blog_model_1.default.findByIdAndUpdate(_id, updatedFields);
        return res.status(200).json({ message: 'Blog updated successfully' });
    }
    catch (error) {
        console.error('Error editing blog:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
exports.default = editBlog;
