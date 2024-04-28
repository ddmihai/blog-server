import { Request, Response } from "express";
import Category from "../../models/categories.model";

const createCategoryController = async (req: Request, res: Response) => {
    try {
        const { categoryName, categoryDescription } = req.body;

        // Check if the category already exists
        const existingCategory = await Category.findOne({ categoryName: categoryName.trim().toLowerCase() });
        if (existingCategory)
            return res.status(401).json({ message: 'The category already exists' });

        // Create a new category
        const newCategory = new Category({
            categoryName: categoryName.trim().toLowerCase(),
            categoryDescription: categoryDescription.trim().toLowerCase()
        });

        // Save the new category
        await newCategory.save();

        // Fetch all categories after the new category has been saved
        const allCategories = await Category.find({});

        // Return the newly created category along with all categories
        return res.status(201).json({
            message: 'Category created',
            categories: allCategories
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: error instanceof Error ? error.message : 'Error creating category'
        });
    }
}

export default createCategoryController;
