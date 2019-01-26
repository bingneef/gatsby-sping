import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'

import styles from '../jobs.module.css'

const card = ({ node }) => {
  return (
    <div className={styles.todoItem} key={node.id}>
      <Link to={`/jobs/${node.id}`}>
        <Img alt={node.title} fluid={node.image.childImageSharp.fluid} />
      </Link>
      <strong>
        {node.title} - {node.businessName}
      </strong>
      <p
        dangerouslySetInnerHTML={{
          __html: node.description,
        }}
      />
    </div>
  )
}

export default card
