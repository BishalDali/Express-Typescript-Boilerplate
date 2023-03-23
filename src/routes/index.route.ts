import userRouter from "./user.route";


import { Router } from "express";

const router = Router();

router.use("/user", userRouter);






export default router;
