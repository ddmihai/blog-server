import { Router } from "express";
import addBlogImageCOntroller from "../controllers/blogs/addBlogImage";
import upload from "../middleware/multer";
import createBlogController from "../controllers/blogs/createBlog";
import getAllblogs from "../controllers/blogs/getAllBlogs";
import getBlogByIdController from "../controllers/blogs/getBlogById";
import completeBlog from "../controllers/blogs/completeBlog";
import getBlogsByCategoryId from "../controllers/blogs/getBlogsByCategoryId";
import editBlog from "../controllers/blogs/editBlog";
const blogRouter = Router();



blogRouter.post('/addBlogImage', upload.single('image'), addBlogImageCOntroller)
blogRouter.post('/createBlog', createBlogController);
blogRouter.post('/getSingleBlog', getBlogByIdController)

blogRouter.get('/getAllBlogs', getAllblogs);
blogRouter.put('/completeBlog', completeBlog);

blogRouter.post('/getBlogsByCategoryId', getBlogsByCategoryId);
blogRouter.put('/editblog', editBlog);


export default blogRouter;