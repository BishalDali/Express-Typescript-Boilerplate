import { Express } from "express";
import { UserController } from "../controllers/user.controller";
import { Router } from "express";

const userRouter = Router();



userRouter.post("/register", new UserController().register);
userRouter.post("/login", new UserController().login);




export default userRouter;