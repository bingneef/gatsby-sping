const { BLOCKS } = require('@contentful/rich-text-types')
let config = {}

try {
  // Load the Contentful config from the .contentful.json
  config = require('./.config')
} catch (_) {}

// Overwrite the Contentful config with environment variables if they exist
config.contentful = {
  spaceId: process.env.GATSBY_CONTENTFUL_SPACE_ID || config.contentful.spaceId,
  accessToken:
    process.env.GATSBY_CONTENTFUL_ACCESS_TOKEN || config.contentful.accessToken,
  host: process.env.GATSBY_CONTENTFUL_HOST || undefined,
}

// Overwrite the KolibrieNext config with environment variables if they exist
config.kolibrienext = {
  accessToken:
    process.env.KOLIBRIENEXT_ACCESS_TOKEN || config.kolibrienext.accessToken,
}

module.exports = {
  siteMetadata: {
    title: `Gatsby - Sping`,
  },
  plugins: [
    'gatsby-plugin-typescript',
    'gatsby-plugin-netlify-cache',
    'gatsby-transformer-remark',
    'gatsby-transformer-sharp',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sharp',
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        includePaths: ['./src'],
      },
    },
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`./src/layouts/index.js`),
      },
    },
    {
      resolve: 'gatsby-source-contentful',
      options: config.contentful,
    },
    {
      resolve: '@contentful/gatsby-transformer-contentful-richtext',
      options: {
        renderOptions: {
          renderNode: {
            [BLOCKS.EMBEDDED_ASSET]: node => {
              return `<img src=${node.data.target.fields.file['en'].url} />`
            },
          },
        },
      },
    },
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        color: `#2c159d`,
        showSpinner: true,
      },
    },
    {
      resolve: 'gatsby-source-kolibrie-next',
      options: config.kolibrienext,
    },
    'gatsby-transform-create-pages',
    'gatsby-transform-localise',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Kolibrie`,
        short_name: `Kolibrie`,
        start_url: `/`,
        background_color: `#2c159d`,
        theme_color: `#2c159d`,
        display: `standalone`,
        icon: `src/assets/icon.png`,
      },
    },
    'gatsby-plugin-offline',
  ],
}
