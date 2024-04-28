import { Request, Response } from "express";
import User from "../../models/user.model";
import bcrypt from 'bcryptjs';


export const createUserController = async (req: Request, res: Response) => {
    try {
        const { email, password, username } = req.body;

        const existingUSer = await User.findOne({ email });
        if (existingUSer)
            return res.status(401).json({
                message: 'User already exists'
            });

        const hash = await bcrypt.hash(password, 10);
        const newUser = new User({ email, password: hash, username });
        await newUser.save();


        return res.status(201).json({ message: 'User created' });
    }
    catch (error) {
        return res.status(500).json({
            message: error instanceof Error ? error.message : 'Error while creating a user',
            name: error instanceof Error ? error.name : 'Error while creating a user'
        })
    }
}