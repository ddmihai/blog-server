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
const createBlogController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, subtitle, category } = req.body;
        if (!category || !(0, mongoose_1.isValidObjectId)(category))
            return res.status(401).json({ message: 'A valid category id is required' });
        const newBlog = new blog_model_1.default({ title, subtitle, category });
        let responseNewBlog = yield newBlog.save();
        return res.status(201).json({
            message: 'Blog created. You can add content and images by editing the existing blog',
            newBlog
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error instanceof Error ? error.message : 'Error while creating a blog. Please checkout the create route controller!',
            name: error instanceof Error ? error.name : ''
        });
    }
});
exports.default = createBlogController;
