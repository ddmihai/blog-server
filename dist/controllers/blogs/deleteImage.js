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
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const blog_model_1 = __importDefault(require("../../models/blog.model"));
const deleteImageController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //blogImage/blogId=?&image=?
        const { blogId, image } = req.query;
        if (!blogId || !image)
            return res.status(403).json({
                message: 'Invalid payload',
                status: 403
            });
        let splitImage = image.toString().split('uploads/')[1];
        const pathToDeleteImage = path_1.default.join(__dirname, '..', '..', 'uploads', splitImage);
        // delete the image from the blog
        yield blog_model_1.default.findByIdAndUpdate(blogId, {
            $pull: { images: image }
        });
        fs_1.default.unlink(pathToDeleteImage, (error) => {
            if (error)
                return res.status(500).json({ message: 'The image has not been deleted', error });
            return res.status(200).json({ message: 'Image removed succesfully' });
        });
    }
    catch (error) {
        return res.status(500).json({ message: error instanceof Error ? error.message : 'Internal error' });
    }
});
exports.default = deleteImageController;
