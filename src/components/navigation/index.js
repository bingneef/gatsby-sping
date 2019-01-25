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
    </ul>
  </nav>
)
