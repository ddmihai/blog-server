import { Request, Response } from "express";
import User from "../../models/user.model";



import { Session } from 'express-session';

interface CustomSession extends Session {
    userId?: string; // Assuming userId is a string. Adjust the type as necessary.
}


const getUserDataController = async (req: Request & { session: CustomSession }, res: Response) => {
    try {

        console.log(req.session?.userId)
        console.log(req.session)

        // Check if userId is present in the session
        if (!req.session?.userId) {
            return res.status(401).json({ message: 'Unauthorized: User not authenticated' });
        }

        // Get the user by id and without the password
        const userId = req.session.userId;
        const existingUser = await User.findById(userId).select('-password');

        // If the user is not found, send 404 Not Found
        if (!existingUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        // If everything is fine, return the user data
        return res.status(200).json(existingUser);
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};




function returnReject(res: Response) {
    return res.status(401).json({
        message: 'Unauthorized'
    });
}

export default getUserDataController

