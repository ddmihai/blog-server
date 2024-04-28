"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const checkIfUserAuthenticated = (req, res, next) => {
    try {
        console.log(req.session);
        if (!req.session.userId)
            return res.status(403).json({ message: 'Unauthorized' });
        next();
    }
    catch (error) {
        console.log(error);
        next(error);
    }
};
exports.default = checkIfUserAuthenticated;
