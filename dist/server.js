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
const http_1 = __importDefault(require("http"));
const app_1 = __importDefault(require("./app"));
const connection_1 = require("./database/connection");
/*
    SERVER SETTINGS
*/
const port = process.env.PORT || 3000;
const server = http_1.default.createServer(app_1.default);
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    server.listen(port);
    server.on('listening', () => console.log(`Server listening on port ${port}`));
    // Start server
    (0, connection_1.createDatabaseConneciton)();
});
startServer();
