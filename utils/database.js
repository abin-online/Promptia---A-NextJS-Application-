import mongoose from "mongoose";

let isConnected = false

export const connect = async () => {
    mongoose.set('strictQuery' , true);

    if(isConnected) {
        console.log('MongoDB is already connected')
        return
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI , {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        isConnected = true
        console.log('MONGODB connected')
    } catch (error) {
        console.log(error)
    }
}
