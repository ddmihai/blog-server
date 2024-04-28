"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const appConfig_1 = require("./config/appConfig");
const path_1 = __importDefault(require("path"));
/*
    CORS AND EXPRESS JSON
    STATIC FILES
*/
const cors_1 = __importDefault(require("cors"));
app.use((0, cors_1.default)({
    origin: ['http://localhost:3333', 'https://blog-frontend-22f440b476b9.herokuapp.com'],
    credentials: true
}));
app.use(express_1.default.json());
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, 'uploads')));
/**
    EXPRESS SESSION
*/
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const express_session_1 = __importDefault(require("express-session"));
const sessionStore = connect_mongo_1.default.create({ mongoUrl: appConfig_1.appConfig.mongodb_url });
app.use((0, express_session_1.default)({
    secret: appConfig_1.appConfig.session_secret,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
        httpOnly: app.get('env') === 'production',
        secure: app.get('env') === 'production',
        sameSite: app.get('env') === 'production' ? 'none' : 'lax',
        maxAge: 24 * 60 * 60 * 1000 // Valid pentru o zi
    }
}));
const users_router_1 = __importDefault(require("./router/users.router"));
const categories_router_1 = __importDefault(require("./router/categories.router"));
const blog_touter_1 = __importDefault(require("./router/blog.touter"));
app.get('/', (req, res, next) => res.status(200).json({ message: 'Welcome' }));
app.use('/api', users_router_1.default);
app.use('/api', categories_router_1.default);
app.use('/api', blog_touter_1.default);
app.use('*', (req, res, next) => {
    return res.status(404).json({
        message: 'The url you provided does not exists'
    });
});
exports.default = app;
