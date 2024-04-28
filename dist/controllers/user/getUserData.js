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
const user_model_1 = __importDefault(require("../../models/user.model"));
const getUserDataController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        // Reject if there is not sesision or no userId
        if (!req.session || !((_a = req.session) === null || _a === void 0 ? void 0 : _a.userId))
            returnReject(res);
        // Get the user by id and without the password
        const userId = req.session.userId;
        const existingUser = yield user_model_1.default.findById(userId).select('-password');
        // If the user is not found, reject as unauthorized
        if (!existingUser)
            returnReject(res);
        if (existingUser)
            return res.status(200).json(existingUser);
    }
    catch (error) {
        return res.status(500).json(error);
    }
});
function returnReject(res) {
    return res.status(401).json({
        message: 'Unauthorized'
    });
}
exports.default = getUserDataController;
