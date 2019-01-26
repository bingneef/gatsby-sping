import React from 'react'
import { graphql } from 'gatsby'
import Image from 'gatsby-image'
import get from 'lodash/get'
import Helmet from 'react-helmet'

import TeamMemberBox from '../components/team-member/box'

const RootIndex = ({ data, pageContext: { locale } }) => {
  const siteTitle = get(data, 'site.siteMetadata.title')
  const node = get(data, 'allContentfulPage.edges[0].node')
  const creators = node.creators || []

  return (
    <>
      <Helmet title={siteTitle} />
      <div className="wrapper">
        <h2 className="section-headline">{node.title}</h2>
        {/* <p
          dangerouslySetInnerHTML={{
            __html: node.section1.childContentfulRichText.html,
          }}
        /> 
        <Image fluid={node.sectionBanner1.fluid} />
        <p
          dangerouslySetInnerHTML={{
            __html: node.section2.childContentfulRichText.html,
          }}
        />  */}
        <br />
        {creators.map((node, index) => (
          <TeamMemberBox index={index} key={node.id} {...node} />
        ))}
      </div>
    </>
  )
}

export default RootIndex

export const pageQuery = graphql`
  query PageQuery($locale: String = "en") {
    allContentfulPage(filter: { node_locale: { eq: $locale } }) {
      edges {
        node {
          title
          sections {
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
            id
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
    }
  }
`
