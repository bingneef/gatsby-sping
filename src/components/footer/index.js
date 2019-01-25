import React from 'react'
import { StaticQuery, graphql } from 'gatsby'

import styles from './footer.module.css';
import Link from '../link'

const Footer = ({ data }) => {
  const { contentfulFooter:node } = data;

  return (
    <div className={styles.root}>
      <p
        dangerouslySetInnerHTML={{
          __html: node.privacyStatement.childContentfulRichText.html,
        }}
      />
      <p
        dangerouslySetInnerHTML={{
          __html: node.contactDetails.childContentfulRichText.html,
        }}
      />
      <nav role="navigation">
        <ul className={styles.navigation}>
          { node.navigation.map(item => (
            <li key={item.slug} className={styles.navigationItem}>
              <Link to={`/${item.slug}`}>{ item.title }</Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

const componentQuery = graphql`
  query allContentfulFooter {
    contentfulFooter {
      navigation {
        title
        slug
      }
      contactDetails {
        childContentfulRichText{
          html
        }
      }
      privacyStatement {
        childContentfulRichText{
          html
        }
      }
    }
  }
`


export default props => (
  <StaticQuery
    query={componentQuery}
    render={data => <Footer data={data} {...props} />}
  />
)