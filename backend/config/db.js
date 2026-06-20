import mongoose from "mongoose";
const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("DB connected")
    } catch (error) {
        console.log("DB error"+ error.message)
    }
    
}
export default connectDb