"use client"

import { useState, useRef } from 'react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState<string | null>(null)
  const passwordRef = useRef<HTMLInputElement | null>(null)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setMessage(null)
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password: passwordRef.current?.value || '' })
    })
    const data = await res.json()
    if (!res.ok) setMessage(data.error || 'Error')
    else {
      setMessage(`Welcome ${data.user.username}`)
      if (passwordRef.current) passwordRef.current.value = ''
    }
  }

  return (
    <main style={{ padding: 20 }}>
      <h1>Login</h1>
      <form onSubmit={submit} style={{ display: 'grid', gap: 8, maxWidth: 320 }}>
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
        <input ref={passwordRef} placeholder="Password" type="password" />
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </main>
  )
}
