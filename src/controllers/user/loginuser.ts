import { Request, Response } from "express"
import bcrypt from 'bcryptjs';
import User from "../../models/user.model";



const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (!existingUser)
            return res.status(404).json({ message: 'Invalid credentials' });


        let match = await bcrypt.compare(password, existingUser.password);
        if (!match)
            return res.status(404).json({ message: 'Invalid credentials' });


        (req.session as any).userId = existingUser._id;
        req.session.save();

        return res.status(200).json({ message: 'Welcome back' });
    }
    catch (error) {
        return res.status(500).json({
            message: error instanceof Error ? error.message : 'Error while login',
            name: error instanceof Error ? error.name : ''
        })
    }
}

export default loginUser