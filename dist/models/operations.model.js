"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const operationsSchema = new mongoose_1.default.Schema({
    key: {
        type: String,
        required: true
    },
    value: {
        type: Boolean,
        default: false
    }
});
const Operations = mongoose_1.default.model('Operations', operationsSchema);
exports.default = Operations;
