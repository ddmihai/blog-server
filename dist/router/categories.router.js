"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const createCategory_1 = __importDefault(require("../controllers/categories/createCategory"));
const getAllCategories_1 = __importDefault(require("../controllers/categories/getAllCategories"));
const categoryController = (0, express_1.Router)();
/**
 *      Create user
 *      Login user
*/
categoryController.post('/createCategory', createCategory_1.default);
categoryController.get('/categories', getAllCategories_1.default);
exports.default = categoryController;
