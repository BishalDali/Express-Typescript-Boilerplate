export interface IUserInput{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
}

export interface ILoginResponse{
    token: string;
    user : {
        firstName: string;
        lastName: string;
        email: string;
        role: string;
    }
}

