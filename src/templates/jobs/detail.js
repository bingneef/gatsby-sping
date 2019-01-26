import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import Img from 'gatsby-image'
import styles from './jobs.module.css'

class JobDetail extends React.Component {
  render() {
    const node = get(this.props, 'data.kolibrieNextJob')
    const mapsUrl = ``
    return (
      <div className={styles.root}>
        <Helmet title={'KolibrieNext Favs'} />
        <div className="wrapper">
          <h2 className="section-headline">
            {node.title} - {node.businessName}
          </h2>
          <div className="article-list">
            <div className={styles.todoItem}>
              <Img alt={node.title} fluid={node.image.childImageSharp.fluid} />
              <p
                dangerouslySetInnerHTML={{
                  __html: node.description,
                }}
              />

              <h2>Location</h2>
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
