import express, { Application } from 'express';
const app: Application = express();
import { appConfig } from './config/appConfig';
import path from 'path';


/* 
    CORS AND EXPRESS JSON
    STATIC FILES
*/
import cors from 'cors';
app.use(cors({
    origin: app.get('env') === 'production' ? 'https://blog-frontend-22f440b476b9.herokuapp.com' : 'http://localhost:3333',
    credentials: true
}));

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.set('trust proxy', 1);






/**
    EXPRESS SESSION
*/
import MongoStore from 'connect-mongo';
import session from 'express-session';



const sessionStore = MongoStore.create({ mongoUrl: appConfig.mongodb_url });

app.use(session({
    secret: appConfig.session_secret as string,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
        httpOnly: app.get('env') === 'production',
        secure: app.get('env') === 'production',
        sameSite: app.get('env') === 'production' ? 'none' : 'lax',
        maxAge: 24 * 60 * 60 * 1000  // Valid pentru o zi
    }
}));






import userRouter from './router/users.router';
import categoryController from './router/categories.router';
import blogRouter from './router/blog.touter';

import fs from 'fs';
app.get('/', async (req, res, next) => {
    const pathToUploads = path.join(__dirname, 'uploads');

    fs.readdir(pathToUploads, 'utf-8', (error, content) => {
        if (error) {
            console.error('Error:', error);
            return;
        }

        // Log the content to the console
        console.log(content);
    });

    return res.status(200).json({ message: 'Welcome' });
});


app.use('/api', userRouter);
app.use('/api', categoryController);
app.use('/api', blogRouter);






app.use('*', (req, res, next) => {
    console.log(`Requested URL: ${req.originalUrl}`);

    return res.status(404).json({
        message: 'The url you provided does not exists'
    })
})



export default app;