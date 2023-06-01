import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)
//using the pre-hook. Means we want this to happen before it gets saved in the db
//this here means if user create means
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    //if the password isn't modified
    next()
  }
  const salt = await bcrypt.genSalt(10) //salt the key to hash the password with. takes in the number rof rounds
  this.password = await bcrypt.hash(this.password, salt) //hashing teh current password
})

const User = mongoose.model('User', userSchema)
export default User
//export to userControlller
