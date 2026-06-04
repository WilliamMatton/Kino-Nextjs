import { NextRequest, NextResponse } from 'next/server'
import connectToMongo from '../../../../../lib/mongo'
import User from '../../../../../models/User'
import { verifyPassword } from '../../../../../lib/hash'

export async function POST(req: NextRequest) {
  try {
    const { email: identifier, password } = await req.json()

    if (!identifier || !password) {
      if (!identifier && !password) return NextResponse.json({ error: 'E-post/användarnamn och lösenord saknas' }, { status: 400 })
      if (!identifier) return NextResponse.json({ error: 'E-post eller användarnamn saknas' }, { status: 400 })
      return NextResponse.json({ error: 'Lösenord saknas' }, { status: 400 })
    }

    await connectToMongo()

    const user = await User.findOne({ $or: [{ email: identifier }, { username: identifier }] })
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })

    const ok = await verifyPassword(user.password, password)
    if (!ok) return NextResponse.json({ error: 'Wrong password' }, { status: 401 })

    return NextResponse.json({ ok: true, user: { id: user._id, username: user.username, email: user.email } }, { status: 200 })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
