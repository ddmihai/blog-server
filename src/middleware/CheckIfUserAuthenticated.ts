import { NextFunction, Request, Response } from "express";


const checkIfUserAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    try {

        if (!req.session.userId)
            return res.status(403).json({ message: 'Unauthorized' });

        next();
    }

    catch (error) {
        console.log(error);
        next(error);
    }
}

export default checkIfUserAuthenticated;