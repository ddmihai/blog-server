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
const mongoose_1 = require("mongoose");
const addBlogImageCOntroller = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { blogId } = req.body;
        if (!(0, mongoose_1.isValidObjectId)(blogId))
            return res.status(400).json({ error: 'Invalid blog id' });
        const blogRequired = yield blog_model_1.default.findOne({ _id: blogId });
        if (!blogRequired)
            return res.status(400).json({ error: 'Blog not found' });
        if (!req.file)
            return res.status(400).json({ error: 'No file uploaded' });
        // Create image link for creating the image reference
        const imageURL = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
        yield blog_model_1.default.findByIdAndUpdate(blogId, {
            $push: { images: imageURL }
        });
        let blogImages = yield blog_model_1.default.findById(blogId).select('images');
        return res.status(201).json(blogImages);
    }
    catch (error) {
        res.send(error);
    }
});
exports.default = addBlogImageCOntroller;
