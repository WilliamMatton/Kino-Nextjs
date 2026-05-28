"use client"

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import styles from '../../styles/signup.module.scss'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState<{ text: string; type?: 'error' | 'success' } | null>(null)
  const passwordRef = useRef<HTMLInputElement | null>(null)
  const router = useRouter()

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setMessage(null)
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password: passwordRef.current?.value || '' })
    })
    const data = await res.json()

    if (!res.ok) {
      if (res.status === 401) {
        setMessage({ text: 'Fel lösenord', type: 'error' })
      } else if (res.status === 404) {
        if (email.includes('@')) setMessage({ text: 'Din e-post är inte registrerad', type: 'error' })
        else setMessage({ text: 'Användarnamnet är inte registrerat', type: 'error' })
      } else {
        setMessage({ text: data.error || 'Ett fel uppstod', type: 'error' })
      }
    } else {
      setMessage({ text: `Välkommen ${data.user.username}`, type: 'success' })
      if (passwordRef.current) passwordRef.current.value = ''
    }
  }

  return (
    <main className={styles.signupMain}>
      <div className={styles.signupCard}>
        <h2>Logga in</h2>
        <p className={styles.textMuted}>Ange dina uppgifter för att logga in</p>

        <form onSubmit={submit} className={styles.signupForm}>
          <div className={styles.fieldGroup}>
            <label htmlFor="loginId" className={styles.fieldLabel}>E-post eller användarnamn</label>
            <input id="loginId" className={styles.formControl} value={email} onChange={e => setEmail(e.target.value)} />
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="loginPassword" className={styles.fieldLabel}>Lösenord</label>
            <input id="loginPassword" className={styles.formControl} ref={passwordRef} type="password" />
          </div>

          <div className={styles.buttonGroup}>
            <button type="submit" className={styles.btnPrimary}>Logga in</button>
            <button type="button" className={styles.btnSecondary} onClick={() => router.push('/')}>Avbryt</button>
          </div>
        </form>

        <div className={styles.loginSpacer} />
        <p className={styles.loginHint}>Inget konto? <a className={styles.loginLink} href="/signup">Klicka här för att registrera dig!</a></p>

        {message && (
          <div className={`${styles.alert} ${message.type === 'error' ? styles.alertError : styles.alertSuccess}`}>
            {message.text}
          </div>
        )}
      </div>
    </main>
  )
}
