const Promise = require('bluebird')
const path = require('path')
const createPaginatedPages = require('gatsby-paginate')

const resolvePages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    resolve(
      graphql(
        `
          {
            allContentfulPage {
              edges {
                node {
                  title
                  slug
                  node_locale
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        const pages = result.data.allContentfulPage.edges
        const component = path.resolve('./src/templates/page.js')
        pages.forEach((page, _) => {
          pageFromNode({ page, createPage, component })
        })
      })
    )
  })
}

const resolveClientPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    resolve(
      graphql(
        `
          {
            allContentfulContentPage {
              edges {
                node {
                  title
                  slug
                  node_locale
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        const pages = result.data.allContentfulContentPage.edges
        const component = path.resolve('./src/templates/client-page.js')
        pages.forEach((page, _) => {
          pageFromNode({ page, createPage, component })
        })
      })
    )
  })
}

const resolveJobPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return new Promise((resolve, reject) => {
    graphql(`
      {
        jobs: allKolibrieNextJob(sort: { fields: [id], order: DESC }) {
          edges {
            node {
              id
              title
              businessName
              description
              image {
                childImageSharp {
                  fluid(maxWidth: 1080) {
                    base64
                    aspectRatio
                    src
                    srcSet
                    sizes
                  }
                }
              }
            }
          }
        }
      }
    `).then(result => {
      if (result.errors) {
        console.log(result.errors)
        reject(result.errors)
      }

      createPaginatedPages({
        edges: result.data.jobs.edges,
        createPage,
        pageTemplate: path.resolve('./src/templates/jobs/index.js'),
        pageLength: 12,
        pathPrefix: 'jobs',
      })

      result.data.jobs.edges.map(({ node }) => {
        createPage({
          path: `/jobs/${node.id}/`,
          component: path.resolve('./src/templates/jobs/detail.js'),
          context: {
            id: node.id,
          },
        })
      })
      resolve()
    })
  })
}

const pageFromNode = ({ page, createPage, component }) => {
  if (page.node.node_locale === 'en') {
    let path = `/${page.node.slug}/`
    createPage({
      path,
      component,
      context: {
        slug: page.node.slug,
      },
    })
  }
}

exports.createPages = args => {
  return Promise.all([
    resolvePages(args),
    resolveClientPages(args),
    resolveJobPages(args),
  ])
}
