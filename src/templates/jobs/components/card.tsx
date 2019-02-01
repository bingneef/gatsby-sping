import React from 'react'
import { Link } from 'gatsby'
import Image, { FluidObject } from 'gatsby-image'

import styles from '../jobs.module.css'

const Card = ({ node }: ComponentProps) => {
  return (
    <div className={styles.card} key={node.id}>
      <Link to={`/jobs/${node.id}`}>
        {node.image && (
          <Image alt={node.title} fluid={node.image.childImageSharp.fluid} />
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

export default Card

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
