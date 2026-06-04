import Image from 'next/image'
import Link from 'next/link'
import styles from '@/styles/home.module.scss'

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Image src="/images/Proxima-B.gif" alt="Proxima B" width={140} height={80} unoptimized />
      </div>
      <nav className={styles.nav}>
        <a className={styles.active}>Visningar</a>
        <Link href="/movies">Filmer</Link>
        <a>Bistro/café</a>
        <a>Kontakta oss</a>
        <a>Om oss</a>
      </nav>
      <div className={styles.actions}>
        <Link href="/signup" className={styles.secondary}>Bli medlem</Link>
        <Link href="/login" className={styles.secondary}>Logga in</Link>
        <button className={styles.book}>Boka biljett</button>
      </div>
    </header>
  )
}
