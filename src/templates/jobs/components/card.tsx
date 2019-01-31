import React from 'react'
import { Link } from 'gatsby'
import Img, { FluidObject } from 'gatsby-image'

import styles from '../jobs.module.css'

const card = ({ node }: ComponentProps) => {
  return (
    <div className={styles.todoItem} key={node.id}>
      <Link to={`/jobs/${node.id}`}>
        {node.image && (
          <Img alt={node.title} fluid={node.image.childImageSharp.fluid} />
        )}
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

interface ComponentProps {
  node: {
    id: string
    title: string
    businessName: string
    description: string
    image?: {
      childImageSharp: {
        fluid: FluidObject
      }
    }
  }
}
