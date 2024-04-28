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
const categories_model_1 = __importDefault(require("../../models/categories.model"));
const createCategoryController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { categoryName, categoryDescription } = req.body;
        // Check if the category already exists
        const existingCategory = yield categories_model_1.default.findOne({ categoryName: categoryName.trim().toLowerCase() });
        if (existingCategory)
            return res.status(401).json({ message: 'The category already exists' });
        // Create a new category
        const newCategory = new categories_model_1.default({
            categoryName: categoryName.trim().toLowerCase(),
            categoryDescription: categoryDescription.trim().toLowerCase()
        });
        // Save the new category
        yield newCategory.save();
        // Fetch all categories after the new category has been saved
        const allCategories = yield categories_model_1.default.find({});
        // Return the newly created category along with all categories
        return res.status(201).json({
            message: 'Category created',
            categories: allCategories
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: error instanceof Error ? error.message : 'Error creating category'
        });
    }
});
exports.default = createCategoryController;
