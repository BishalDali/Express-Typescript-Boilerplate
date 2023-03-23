import { Document, model, Schema } from "mongoose";

export interface IUser extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
}

const UserSchema = new Schema<IUser>({
    firstName: {
        type: Schema.Types.String,
        required: true
    },
    lastName: {
        type: Schema.Types.String,
        required: true
    },
    email: {
        type: Schema.Types.String,
        required: true,
        unique: true
    },
    password: {
        type : String,
        required: true
    },
    role: {
        type: Schema.Types.String,
        default: "user"
    }
});

export const User= model("User", UserSchema);
