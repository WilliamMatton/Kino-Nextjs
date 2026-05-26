import Image from 'next/image'
import styles from '../styles/home.module.scss'
import Upcomingfilms from './Upcomingfilms'

export default function Home() {
  return (
    <main className={styles.wrapper}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <Image src="/images/Proxima-B.gif" alt="Proxima B" width={140} height={80} />
        </div>
        <nav className={styles.nav}>
          <a className={styles.active}>Visningar</a>
          <a>Filmer</a>
          <a>Bistro/café</a>
          <a>Kontakta oss</a>
          <a>Om oss</a>
        </nav>
        <div className={styles.actions}>
          <button className={styles.book}>Boka biljett</button>
        </div>
      </header>

      <section className={styles.hero}>
        <h1>Populära filmer</h1>
      </section>

      <section className={styles.upcoming}>
        <Upcomingfilms />
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerCols}>
          <div className={styles.col}>
            <h3>Om Proxima Cinema</h3>
            <p>Upplev det bästa inom biounderhållning med premium ljud samt bästa bildkvalitet.</p>
            <div className={styles.socials}>
              <span className={styles.social}>X</span>
              <span className={styles.social}>f</span>
              <span className={styles.social}>ig</span>
              <span className={styles.social}>t</span>
            </div>
          </div>

          <div className={styles.col}>
            <h3>Länkar</h3>
            <ul>
              <li>Visningar</li>
              <li>Filmer</li>
              <li>Bistro/café</li>
              <li>Kontakta oss</li>
              <li>Om oss</li>
            </ul>
          </div>

          <div className={styles.col}>
            <h3>Kontakt</h3>
            <p>Vintergatan 42</p>
            <p>(555) 123-4567</p>
            <p>info@proximacinema.com</p>
          </div>
        </div>
        <div className={styles.copy}>© 2025 Proxima Cinema. All rights reserved.</div>
      </footer>
    </main>
  )
}
