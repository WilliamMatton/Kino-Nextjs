import mongoose from 'mongoose'


// - email: user's email (unique)
// - username: chosen username (unique)
// - password: hashed password
// - createdAt: timestamp
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  username: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
})

const User = (mongoose.models.User as mongoose.Model<any>) || mongoose.model('User', UserSchema)

export default User
