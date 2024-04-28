import { Router } from "express";
import { createUserController } from "../controllers/user/createUser";
import loginUser from "../controllers/user/loginuser";
import getUserDataController from "../controllers/user/getUserData";

const userRouter = Router();



/**
 *      Create user
 *      Login user
*/
userRouter.post('/signup', createUserController);
userRouter.post('/login', loginUser)

userRouter.get('/userData', getUserDataController);


export default userRouter;