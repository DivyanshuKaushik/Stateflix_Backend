import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Stateflix</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
      <div className="space-y-8">
        <p className="text-xl text-primary">Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora deleniti amet error in asperiores sapiente molestiae, dicta quidem nostrum voluptatum ea nam corporis molestias vitae, voluptate suscipit corrupti reiciendis provident?</p>
        <p className="text-xl text-secondary">Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora deleniti amet error in asperiores sapiente molestiae, dicta quidem nostrum voluptatum ea nam corporis molestias vitae, voluptate suscipit corrupti reiciendis provident?</p>
    </div>
      </main>

    </div>
  )
}