import React from 'react'
import { Link } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'

import Card from './components/card'
import styles from './jobs.module.css'

class JobsIndex extends React.Component {
  render() {
    const jobs = get(this, 'props.pageContext.group')
    const currentPage = get(this, 'props.pageContext.index')
    const lastPage = get(this, 'props.pageContext.last')

    return (
      <div className={styles.root}>
        <Helmet title={'KolibrieNext Favs'} />
        <div className="wrapper">
          <h2 className="section-headline">Featured jobs</h2>
          <div className={styles.jobsList}>
            {jobs.map(props => (
              <Card key={props.node.id} {...props} />
            ))}
          </div>
          <div className={styles.pagination}>
            {currentPage > 1 && (
              <Link to={`/jobs/${currentPage == 2 ? '' : currentPage - 1}`}>
                Vorige pagina
              </Link>
            )}
            {!lastPage && (
              <Link to={`/jobs/${currentPage + 1}`}>Volgende pagina</Link>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default JobsIndex
