"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from '../../styles/signup.module.scss'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState<{ text: string; type?: 'error' | 'success' } | null>(null)
  const router = useRouter()

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setMessage(null)

    // Client-side validation to mirror server messages
    const missing: string[] = []
    if (!email) missing.push('E-post')
    if (!username) missing.push('Användarnamn')
    if (!password) missing.push('Lösenord')
    if (!firstName) missing.push('Förnamn')
    if (!lastName) missing.push('Efternamn')

    if (missing.length > 0) {
      if (missing.length === 1) {
        setMessage({ text: `${missing[0]} saknas`, type: 'error' })
      } else {
        setMessage({ text: `Följande fält saknas: ${missing.join(', ')}`, type: 'error' })
      }
      return
    }
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, firstName, lastName, username, password })
    })
    const data = await res.json()
    if (!res.ok) setMessage({ text: data.error || 'Ett fel uppstod', type: 'error' })
    else setMessage({ text: 'Registrering lyckades', type: 'success' })
  }

  return (
    <main className={styles.signupMain}>
      <div className={styles.signupCard}>
        <h2>Registrera konto</h2>
        <p className={styles.textMuted}>Fyll i dina uppgifter och välj ett starkt lösenord</p>

        <form onSubmit={submit} className={styles.signupForm}>
          <div className={styles.fieldGroup}>
            <label htmlFor="username" className={styles.fieldLabel}>Användarnamn</label>
            <input id="username" className={styles.formControl} value={username} onChange={e => setUsername(e.target.value)} />
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="firstName" className={styles.fieldLabel}>Förnamn</label>
            <input id="firstName" className={styles.formControl} value={firstName} onChange={e => setFirstName(e.target.value)} />
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="lastName" className={styles.fieldLabel}>Efternamn</label>
            <input id="lastName" className={styles.formControl} value={lastName} onChange={e => setLastName(e.target.value)} />
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="email" className={styles.fieldLabel}>E-post</label>
            <input id="email" className={styles.formControl} value={email} onChange={e => setEmail(e.target.value)} />
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="password" className={styles.fieldLabel}>Lösenord</label>
            <input id="password" className={styles.formControl} value={password} onChange={e => setPassword(e.target.value)} type="password" />
          </div>

          <div className={styles.buttonGroup}>
            <button type="submit" className={styles.btnPrimary}>Registrera</button>
            <button type="button" className={styles.btnSecondary} onClick={() => router.push('/')}>Avbryt</button>
          </div>
        </form>

        {message && (
          <div className={`${styles.alert} ${message.type === 'error' ? styles.alertError : styles.alertSuccess}`}>
            {message.text}
          </div>
        )}
      </div>
    </main>
  )
}
