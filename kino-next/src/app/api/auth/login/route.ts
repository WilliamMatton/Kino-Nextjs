import { NextRequest, NextResponse } from 'next/server'
import connectToMongo from '../../../../../lib/mongo'
import User from '../../../../../models/User'
import { verifyPassword } from '../../../../../lib/hash'

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    await connectToMongo()

    const user = await User.findOne({ email })
    if (!user) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })

    const ok = await verifyPassword(user.password, password)
    if (!ok) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })

    // Return minimal user info (no sessions in this simple example)
    return NextResponse.json({ ok: true, user: { id: user._id, username: user.username, email: user.email } }, { status: 200 })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
