import mongoose from "mongoose";

export const dbConnect = async (
    url: string
) => {
    if (mongoose.connection.readyState >= 1) {
        return;
    }
    try{
    await mongoose.connect(url)
    mongoose.set('strictQuery', false);
    console.log("Database Connected");
    }catch(err){
        console.log(err);
    }
    
};

