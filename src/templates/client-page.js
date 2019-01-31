import React, { Fragment } from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import get from 'lodash/get'
import Image from 'gatsby-image'

import TeamMemberBox from '../components/team-member/box'

const ClientPageTemplate = ({ data }) => {
  const node = get(data, 'contentfulContentPage')
  const siteTitle = get(data, 'site.siteMetadata.title')

  return (
    <div style={{ background: '#fff' }}>
      <Helmet title={`${node.title} | ${siteTitle}`} />
      <div className="wrapper">
        <h1 className="section-headline">{node.title}</h1>
        {node.sections.map(node => (
          <Fragment key={node.name}>
            {node.content && (
              <p
                dangerouslySetInnerHTML={{
                  __html: node.content.childContentfulRichText.html,
                }}
              />
            )}
            {node.banner && <Image fluid={node.banner.fluid} />}
          </Fragment>
        ))}
        <br />
        {node.creators.map(teamMember => (
          <TeamMemberBox {...teamMember} />
        ))}
      </div>
    </div>
  )
}

export default ClientPageTemplate

export const pageQuery = graphql`
  query ClientPageBySlug($slug: String!, $locale: String!) {
    contentfulContentPage(slug: { eq: $slug }, node_locale: { eq: $locale }) {
      title
      sections {
        name
        content {
          childContentfulRichText {
            html
          }
        }
        banner {
          fluid(
            maxHeight: 240
            resizingBehavior: PAD
            background: "rgb:000000"
          ) {
            ...GatsbyContentfulFluid
          }
        }
      }
      creators {
        key: id
        name
        jobTitle
        quote
        profilePicture {
          fluid(
            maxWidth: 64
            maxHeight: 64
            resizingBehavior: PAD
            background: "rgb:000000"
          ) {
            ...GatsbyContentfulFluid
          }
        }
      }
    }
  }
`
