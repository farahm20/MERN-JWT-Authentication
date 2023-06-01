import mongoose from 'mongoose'

//connects to the database
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log(
      `🚀 ~ file: db.js:6 ~ MongoDB connected ~ conn: ${conn.connection.host}`,
    )
  } catch (error) {
    console.log(`🚀 ~ file: db.js:10 ~ connectDB ~ error: ${error.message} `)
    process.exit(1)
  }
}

export default connectDB
//called in server.
