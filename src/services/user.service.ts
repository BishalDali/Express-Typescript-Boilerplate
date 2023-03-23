import { User } from "../models/user.model";
import {hash, compare} from "bcrypt";
import { sign } from "jsonwebtoken";
import { ACCESS_TOKEN_KEY, ACCESS_TOKEN_EXPIRE_MINUTES } from "../constant/index";
import { ILoginResponse, IUserInput } from "../types/user.types";












    const registerUser = async (user : IUserInput) : Promise<boolean> => {
        try{
            const {
                firstName,
                lastName,
                email,
                password,
                role
            } = user;
            const hashedPassword = await hash(password, 10);
            
            const userAlreadyExists = await User.findOne({email});
            if(userAlreadyExists){
                throw new Error("User already exists");
            }
            const newUser = new User({
                firstName,
                lastName,
                email,
                password: hashedPassword,
                role
            });
            await newUser.save();
            return true;
        }catch(err : any){
            throw new Error(err.message);
        }
    }

    const loginUser = async (email: string, password: string): Promise<ILoginResponse> => {
        try{
            
            const user = await User.findOne({email});
            if(!user){
                throw new Error("User not found");
            }
            const isPasswordValid = await compare(password, user.password);
            if(!isPasswordValid){
                throw new Error("Invalid password");
            }

            if(ACCESS_TOKEN_KEY === undefined){
                throw new Error("ACCESS_TOKEN_KEY is undefined");
            }
            

            const token = sign({
                email: user.email,
                role: user.role
            },
            ACCESS_TOKEN_KEY,
            {
                expiresIn: `${ACCESS_TOKEN_EXPIRE_MINUTES}m`
            }
            );

            return {
                token,
                user: {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    role: user.role
                }

            }
        }catch(err : any){
            throw new Error(err.message);
        

        }
        
    }


    export const userService = {
        registerUser,
        loginUser
    }