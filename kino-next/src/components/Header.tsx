import Image from 'next/image'
import Link from 'next/link'
import styles from '@/styles/home.module.scss'

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">
          <Image src="/images/Proxima-B.gif" alt="Proxima B" width={140} height={80} unoptimized />
        </Link>
      </div>
      <nav className={styles.nav}>
        <Link href="/" className={styles.active}>Visningar</Link>
        <Link href="/movies">Filmer</Link>
      </nav>
      <div className={styles.actions}>
        <button className={styles.book}>Boka biljett</button>
      </div>
    </header>
  )
}
