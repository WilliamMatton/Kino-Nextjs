"use client"

import { useState } from 'react'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState<string | null>(null)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setMessage(null)
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, firstName, lastName, username, password })
    })
    const data = await res.json()
    if (!res.ok) setMessage(data.error || 'Error')
    else setMessage('Registered successfully')
  }

  return (
    <main style={{ padding: 20 }}>
      <h1>Sign up</h1>
      <form onSubmit={submit} style={{ display: 'grid', gap: 8, maxWidth: 320 }}>
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
        <input value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="First name" />
        <input value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Last name" />
        <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />
        <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" type="password" />
        <button type="submit">Register</button>
      </form>
      {message && <p>{message}</p>}
    </main>
  )
}
