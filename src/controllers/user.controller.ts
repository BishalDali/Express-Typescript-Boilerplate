import { Request, Response } from "express";
import {
loginUser,
registerUser
} from "../services/";




export class UserController {
     



public register= async (req: Request, res: Response) => {
    try{
        const {firstName, lastName, email, password, role} = req.body;
        if(!firstName || !lastName || !email || !password){
            throw new Error("All fields are required");
        }





        const register = await registerUser(req.body);
        if(register === true){
            res.status(200).json({
                success: true,
                message: "User registered successfully"
            });
        }

    }catch(err : any){
        res.status(500).json({
            success: false,
            message: err.message
        });
    }    
}

public login = async (req: Request, res: Response) => {
    try {
        const {email, password} = req.body;

        return res.status(200).json(
            await  loginUser(email, password)
        );
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message
        });

    }

    }



}


