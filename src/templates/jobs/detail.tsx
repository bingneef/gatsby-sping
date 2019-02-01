import React from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import Image, { FluidObject } from 'gatsby-image'
import styles from './jobs.module.css'

const JobDetail = ({ data } : ComponentProps) =>{
  const { kolibrieNextJob:node } = data;
  return (
    <div className={styles.root}>
      <Helmet title={'KolibrieNext Favs'} />
      <div className="wrapper">
        <h2 className="section-headline">
          {node.title} - {node.businessName}
        </h2>
        <div className="article-list">
          <div className={styles.card}>
            {node.image && (
              <Image
                alt={node.title}
                fluid={node.image.childImageSharp.fluid}
              />
            )}
            <p
              dangerouslySetInnerHTML={{
                __html: node.description,
              }}
            />

            <h2>Location</h2>
            {node.location && (
              <img
                src={`https://maps.googleapis.com/maps/api/staticmap?center=${
                  node.location.latitude
                },${
                  node.location.longitude
                }&zoom=13&size=1200x300&maptype=roadmap&markers=color:red%7C${
                  node.location.latitude
                },${
                  node.location.longitude
                }&key=AIzaSyCrsot7foy5v_F9QimIVkkbGUqgoE8v8ho`}
              />
            )}

            <h2>Meer weten?</h2>
            <a href={node.deepLink} target="_blank">
              Download de app
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JobDetail

export const pageQuery = graphql`
  query JobDetailQuery($id: String!) {
    kolibrieNextJob(id: { eq: $id }) {
      title
      businessName
      description
      deepLink
      image {
        childImageSharp {
          fluid(maxWidth: 1080) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      location {
        longitude
        latitude
      }
    }
  }
`

interface ComponentProps {
  data: {
    kolibrieNextJob: {
      title: string
      businessName: string
      description: string
      deepLink: string
      location?: {
        latitude: string
        longitude: string
      }
      image?: {
        childImageSharp: {
          fluid: FluidObject
        }
      }
    }
  }
}
