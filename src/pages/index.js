import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import { FormattedMessage } from 'react-intl';

import styles from './index.module.css'
import TeamMemberCard from '../components/team-member/card';

const RootIndex = ({ data }) => {
  const siteTitle = get(data, 'site.siteMetadata.title')
  const teamMembers = get(data, 'allContentfulTeamMember.edges')

  return (
    <>
      <Helmet title={siteTitle} />
      <div className="wrapper">
        <h2 className="section-headline">
          <FormattedMessage id="pages.index.title" />
        </h2>
        <div className={styles.grid}>
          {teamMembers.map(({ node }, index) => <TeamMemberCard index={index} key={node.id} {...node} />)}
        </div>
      </div>
    </>
  )
}

export default RootIndex

export const pageQuery = graphql`
  query TeamMemberQuery($locale: String!) {
    allContentfulTeamMember(
      filter: { node_locale: {eq: $locale } }
    ) {
      edges {
        node {
          id
          name
          jobTitle
          specialities
          description {
            childMarkdownRemark {
              html
            }
          }
          profilePicture {
            fluid(
              maxWidth: 500
              maxHeight: 500
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
`
