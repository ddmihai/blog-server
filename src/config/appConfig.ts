import dotenv from 'dotenv';
dotenv.config();


export const appConfig = {
    mongodb_url: process.env.MONGODB_URL,
    session_secret: process.env.SESSION_SECRET
}