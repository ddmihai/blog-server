import { Request, Response } from "express";
import Category from "../../models/categories.model";

const getAllCategoryes = async (req: Request, res: Response) => {
    try {
        const allCategories = await Category.find();
        res.status(200).json(allCategories);
    }

    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error instanceof Error ? error.message : 'Error while geting the categories',
            name: error instanceof Error ? error.name : ''
        })
    }
}

export default getAllCategoryes;