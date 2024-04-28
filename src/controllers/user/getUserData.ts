import { Request, Response } from "express";
import User from "../../models/user.model";



import { Session } from 'express-session';

interface CustomSession extends Session {
    userId?: string; // Assuming userId is a string. Adjust the type as necessary.
}


const getUserDataController = async (req: Request & { session: CustomSession }, res: Response) => {
    try {

        // Reject if there is not sesision or no userId
        if (!req.session || !req.session?.userId) returnReject(res);


        // Get the user by id and without the password
        const userId = req.session.userId;
        const existingUser = await User.findById(userId).select('-password');

        // If the user is not found, reject as unauthorized
        if (!existingUser) returnReject(res);



        if (existingUser)
            return res.status(200).json(existingUser);
    }

    catch (error) {
        return res.status(500).json(error);
    }
}



function returnReject(res: Response) {
    return res.status(401).json({
        message: 'Unauthorized'
    });
}

export default getUserDataController

