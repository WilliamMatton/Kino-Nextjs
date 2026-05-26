import { NextRequest, NextResponse } from 'next/server'
import connectToMongo from '../../../../../lib/mongo'
import User from '../../../../../models/User'
import { hashPassword } from '../../../../../lib/hash'

export async function POST(req: NextRequest) {
  try {
    const { email, username, password, firstName, lastName } = await req.json()

    if (!email || !username || !password || !firstName || !lastName) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    await connectToMongo()

    const exists = await User.findOne({ $or: [{ email }, { username }] })
    if (exists) {
      return NextResponse.json({ error: 'Email or username already in use' }, { status: 409 })
    }

    const hashed = await hashPassword(password)
    await User.create({ email, username, password: hashed, firstName, lastName })

    return NextResponse.json({ ok: true }, { status: 201 })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
