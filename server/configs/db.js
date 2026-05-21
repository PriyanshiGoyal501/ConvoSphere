import mongoose from 'mongoose';

// Function to connect backend with MongoDB database
const connectDB = async () => {
  try {
    // Event listener to check successful database connection
    mongoose.connection.on('connected',()=> console.log('Database Connected'))
     // Connecting to MongoDB database named "CS"
    await mongoose.connect(`${process.env.MONGODB_URL}/CS`)
  }
  catch(error){
     // Showing error message if connection fails
        console.log(error.message)
  }
}

export default connectDB

