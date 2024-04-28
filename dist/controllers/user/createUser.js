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
exports.createUserController = void 0;
const user_model_1 = __importDefault(require("../../models/user.model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const createUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, username } = req.body;
        const existingUSer = yield user_model_1.default.findOne({ email });
        if (existingUSer)
            return res.status(401).json({
                message: 'User already exists'
            });
        const hash = yield bcryptjs_1.default.hash(password, 10);
        const newUser = new user_model_1.default({ email, password: hash, username });
        yield newUser.save();
        return res.status(201).json({ message: 'User created' });
    }
    catch (error) {
        return res.status(500).json({
            message: error instanceof Error ? error.message : 'Error while creating a user',
            name: error instanceof Error ? error.name : 'Error while creating a user'
        });
    }
});
exports.createUserController = createUserController;
