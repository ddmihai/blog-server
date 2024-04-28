import mongoose from "mongoose";
import { appConfig } from "../config/appConfig";


export const createDatabaseConneciton = async () => {
    try {
        await mongoose.connect(appConfig.mongodb_url as string);

        if (mongoose.connection.readyState === 1) {
            console.log('Database connected!');
        }
        else if (mongoose.connection.readyState === 0) {
            console.log('Database disconnected');
        }
    }
    catch (error) {
        console.log(error);
    }
}