"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const createUser_1 = require("../controllers/user/createUser");
const loginuser_1 = __importDefault(require("../controllers/user/loginuser"));
const getUserData_1 = __importDefault(require("../controllers/user/getUserData"));
const userRouter = (0, express_1.Router)();
/**
 *      Create user
 *      Login user
*/
userRouter.post('/signup', createUser_1.createUserController);
userRouter.post('/login', loginuser_1.default);
userRouter.get('/userData', getUserData_1.default);
exports.default = userRouter;
