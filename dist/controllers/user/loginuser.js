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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_model_1 = __importDefault(require("../../models/user.model"));
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const existingUser = yield user_model_1.default.findOne({ email });
        if (!existingUser)
            return res.status(404).json({ message: 'Invalid credentials' });
        let match = yield bcryptjs_1.default.compare(password, existingUser.password);
        if (!match)
            return res.status(404).json({ message: 'Invalid credentials' });
        req.session.userId = existingUser._id;
        return res.status(200).json({ message: 'Welcome back' });
    }
    catch (error) {
        return res.status(500).json({
            message: error instanceof Error ? error.message : 'Error while login',
            name: error instanceof Error ? error.name : ''
        });
    }
});
exports.default = loginUser;
