import React from 'react'
import Link from '../link'
import styles from './navigation.module.css'

export default () => (
  <nav role="navigation">
    <ul className={styles.navigation}>
      <li className={styles.navigationItem}>
        <Link to="/">Home</Link>
      </li>
      <li className={styles.navigationItem}>
        <Link to="/jobs/">Jobs</Link>
      </li>
      <li className={styles.navigationItem}>
        <Link to="/kolibrie-next/">KolibrieNext</Link>
      </li>
      <li className={styles.navigationItem}>
        <Link to="/about-us/">About us</Link>
      </li>
    </ul>
  </nav>
)
