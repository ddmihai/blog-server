import { Router } from "express";
import createCategoryController from "../controllers/categories/createCategory";
import getAllCategoryes from "../controllers/categories/getAllCategories";
const categoryController = Router();



/**
 *      Create user
 *      Login user
*/
categoryController.post('/createCategory', createCategoryController);
categoryController.get('/categories', getAllCategoryes);


export default categoryController;