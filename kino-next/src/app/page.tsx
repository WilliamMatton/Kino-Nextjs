import Image from 'next/image'
import styles from '../styles/home.module.scss'
import Upcomingfilms from './Upcomingfilms'

export default function Home() {
  return (
    <main className={styles.wrapper}>
      <section className={styles.hero}>
        <h1>Populära filmer</h1>
      </section>

      <section className={styles.upcoming}>
        <Upcomingfilms />
      </section>
    </main>
  )
}
