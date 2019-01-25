// const Promise = require('bluebird')
// const path = require('path')
// const createPaginatedPages = require("gatsby-paginate");

// exports.createPages = (args) => {
//   return Promise.all([createJobPages(args),]);
// };

// const createJobPages = ({ graphql, actions }) => {
//   const { createPage } = actions;
//   return new Promise((resolve, reject) => {
//     graphql(`
//       {
//         jobs: allKolibrieNextJob(
//           sort: { fields: [id], order: DESC }
//         ) {
//           edges{
//             node {
//               id
//               title
//               businessName
//               description
//               image{
//                 childImageSharp{
//                   fluid(maxWidth: 1080){
//                     base64
//                     aspectRatio
//                     src
//                     srcSet
//                     sizes
//                   }
//                 }
//               } 
//             }
//           }
//         }
//       }
//     `).then(result => {
//       if (result.errors) {
//         console.log(result.errors)
//         reject(result.errors)
//       }

//       createPaginatedPages({
//         edges: result.data.jobs.edges,
//         createPage,
//         pageTemplate: "src/templates/jobs.js",
//         pageLength: 2,
//         pathPrefix: "jobs",
//       });

//       result.data.jobs.edges.map(({ node }) => {
//         createPage({
//           path: `/jobs/${node.id}/`,
//           component: path.resolve("./src/templates/job.js"),
//           context: {
//             id: node.id
//           },
//         });
//       });
//       resolve();
//     });
//   });
// };