import mongoose from 'mongoose'

// Use the env variable set in .env.local
const MONGODB_URI = process.env.MONGODB_URI || ''

export async function connectToMongo() {
  if (!MONGODB_URI) {
    console.warn('MONGODB_URI not set — skipping mongoose.connect()')
    return
  }

  if (mongoose.connection.readyState === 1) return

  await mongoose.connect(MONGODB_URI)
  console.log('Connected to MongoDB')
}

export default connectToMongo
