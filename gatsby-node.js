const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

const {
  isHomePage,
  removeTrailingSlash,
  createNodeFromRequest,
} = require("./gatsby-node-helpers")

const { defaultLanguage, languages } = require("./src/services/i18n/config")

const { preBuildFetch } = require("./gatsby-node-constants")

exports.sourceNodes = async ({
  actions,
  createNodeId,
  createContentDigest,
}) => {
  const { createNode } = actions

  await Promise.all(
    preBuildFetch.map(async ({ url, key, nestedFieldKey }) => {
      await createNodeFromRequest({
        createNodeId,
        createContentDigest,
        createNode,
        url,
        key,
        nestedFieldKey,
      })
    })
  )
}

exports.onCreatePage = ({ page, actions }, pluginOptions) => {
  const { createPage, deletePage } = actions

  if (page.path.includes("dev-404")) {
    return Promise.resolve()
  }

  const pageContext = { ...page.context }

  return new Promise(resolve => {
    /*
    Creation of Redirect pages

     */
    console.log(`Processing: ${page.path}`)

    if (isHomePage(page.path)) {
      const pageWithContext = {
        ...page,
        context: {
          ...pageContext,
          languages,
          defaultLanguage,
          lang: defaultLanguage,
          routed: true,
          originalPath: page.path,
          siteUrl: process.env.GATSBY_ROOT_URL,
        },
      }
      deletePage(page)
      createPage(pageWithContext)
    } else {
      const redirect = path.resolve("./src/global/Redirect.js")
      const redirectPage = {
        ...page,
        component: redirect,
        context: {
          ...pageContext,
          languages,
          defaultLanguage,
          lang: defaultLanguage,
          routed: false,
          redirectPage: page.path,
          siteUrl: process.env.GATSBY_ROOT_URL,
        },
      }
      createPage(redirectPage)
    }

    languages.forEach(lang => {
      const localePage = {
        ...page,
        path: `/${lang}${page.path}`,
        matchPath: page.matchPath
          ? `/${lang}${page.matchPath}`
          : page.matchPath,
        context: {
          ...pageContext,
          languages,
          defaultLanguage,
          lang,
          routed: true,
          originalPath: page.path,
          siteUrl: process.env.GATSBY_ROOT_URL,
        },
      }
      createPage(localePage)
      deletePage(page)
    })

    resolve()
  })
}

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    devtool: "eval-source-map",
  })
}

/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

/**
 * Here is the place where Gatsby creates the URLs for all the
 * posts, tags, pages and authors that we fetched from the Ghost site.
 */
// exports.createPages = async ({ graphql, actions }) => {
//   const { createPage } = actions

//   const result = await graphql(`
//       allPartnersList {
//         edges {
//           node {
//             name
//             id
//             logo
//             application_stores {
//               application {
//                 client_id
//                 client_type
//                 name
//                 skip_authorization
//                 authorization_grant_type
//               }
//             }
//           }
//         }
//       }
//     }
//   `)

//   // Check for any errors
//   if (result.errors) {
//     throw new Error(result.errors)
//   }

//   // Extract query results
//   const tags = result.data.allGhostTag.edges
//   const authors = result.data.allGhostAuthor.edges
//   const pages = result.data.allGhostPage.edges
//   const posts = result.data.allGhostPost.edges
//   const tableOfContents = result.data.allHtmlRehype.edges
//   const partners = result.data.allPartnersList
//     ? result.data.allPartnersList.edges
//     : []

//   // Load templates
//   const indexTemplate = path.resolve(`./src/templates/index.js`)
//   const tagsTemplate = path.resolve(`./src/templates/tag.js`)
//   const authorTemplate = path.resolve(`./src/templates/author.js`)
//   const pageTemplate = path.resolve(`./src/templates/page.js`)
//   const postTemplate = path.resolve(`./src/templates/post.js`)

//   //landing pages
//   const landingTemplate = path.resolve(`./src/templates/landing.js`)
//   const { landingData } = require(`./src/constants/landingContent.js`)

//   //partner pages
//   const partnersTemplate = path.resolve(`./src/templates/partner.js`)

//   // Create post pages for LEGACY
//   posts.forEach(({ node }) => {
//     // This part here defines, that our posts will use
//     // a `/:slug/` permalink.
//     node.url = `/posts/${node.slug}`

//     console.log(node.url)

//     const toc = tableOfContents.find(
//       edge => edge.node.context.slug === node.slug
//     ).node.tableOfContents

//     createPage({
//       path: node.url,
//       component: postTemplate,
//       context: {
//         // Data passed to context is available
//         // in page queries as GraphQL variables.
//         slug: node.slug,
//         languages,
//         defaultLanguage,
//         lang: defaultLanguage,
//         toc,
//         siteUrl: siteUrl[process.env.GATSBY_BUILD_MODE],
//         canonical: url.resolve(
//           siteUrl[process.env.GATSBY_BUILD_MODE],
//           `/en/posts/${node.slug}`
//         ),
//       },
//     })
//   })

//   languages.forEach(lang => {
//     // Create tag pages
//     tags.forEach(({ node }) => {
//       const totalPosts = node.postCount !== null ? node.postCount : 0
//       const numberOfPages = Math.ceil(totalPosts / postsPerPage)

//       // This part here defines, that our tag pages will use
//       // a `/tag/:slug/` permalink.
//       node.url = `${lang}/posts/tag/${node.slug}/`

//       Array.from({ length: numberOfPages }).forEach((_, i) => {
//         const currentPage = i + 1
//         const prevPageNumber = currentPage <= 1 ? null : currentPage - 1
//         const nextPageNumber =
//           currentPage + 1 > numberOfPages ? null : currentPage + 1
//         const previousPagePath = prevPageNumber
//           ? prevPageNumber === 1
//             ? node.url
//             : `${node.url}page/${prevPageNumber}/`
//           : null
//         const nextPagePath = nextPageNumber
//           ? `${node.url}page/${nextPageNumber}/`
//           : null

//         createPage({
//           path: i === 0 ? node.url : `${node.url}page/${i + 1}/`,
//           component: tagsTemplate,
//           context: {
//             // Data passed to context is available
//             // in page queries as GraphQL variables.
//             slug: node.slug,
//             limit: postsPerPage,
//             skip: i * postsPerPage,
//             numberOfPages: numberOfPages,
//             humanPageNumber: currentPage,
//             prevPageNumber: prevPageNumber,
//             nextPageNumber: nextPageNumber,
//             previousPagePath: previousPagePath,
//             nextPagePath: nextPagePath,
//             languages,
//             defaultLanguage,
//             lang,
//             siteUrl: siteUrl[process.env.GATSBY_BUILD_MODE],
//           },
//         })
//       })
//     })

//     // Create author pages
//     authors.forEach(({ node }) => {
//       const totalPosts = node.postCount !== null ? node.postCount : 0
//       const numberOfPages = Math.ceil(totalPosts / postsPerPage)

//       // This part here defines, that our author pages will use
//       // a `/author/:slug/` permalink.
//       node.url = `${lang}/posts/author/${node.slug}`

//       Array.from({ length: numberOfPages }).forEach((_, i) => {
//         const currentPage = i + 1
//         const prevPageNumber = currentPage <= 1 ? null : currentPage - 1
//         const nextPageNumber =
//           currentPage + 1 > numberOfPages ? null : currentPage + 1
//         const previousPagePath = prevPageNumber
//           ? prevPageNumber === 1
//             ? node.url
//             : `${node.url}page/${prevPageNumber}/`
//           : null
//         const nextPagePath = nextPageNumber
//           ? `${node.url}page/${nextPageNumber}/`
//           : null

//         createPage({
//           path: i === 0 ? node.url : `${node.url}page/${i + 1}/`,
//           component: authorTemplate,
//           context: {
//             // Data passed to context is available
//             // in page queries as GraphQL variables.
//             slug: node.slug,
//             limit: postsPerPage,
//             skip: i * postsPerPage,
//             numberOfPages: numberOfPages,
//             humanPageNumber: currentPage,
//             prevPageNumber: prevPageNumber,
//             nextPageNumber: nextPageNumber,
//             previousPagePath: previousPagePath,
//             nextPagePath: nextPagePath,
//             languages,
//             defaultLanguage,
//             lang,
//             siteUrl: siteUrl[process.env.GATSBY_BUILD_MODE],
//           },
//         })
//       })
//     })

//     // Create pages
//     pages.forEach(({ node }) => {
//       // This part here defines, that our pages will use
//       // a `/:slug/` permalink.
//       node.url = `${lang}/page/${node.slug}`

//       console.log(node.url)

//       const toc = tableOfContents.find(
//         edge => edge.node.context.slug === node.slug
//       ).node.tableOfContents

//       createPage({
//         path: node.url,
//         component: pageTemplate,
//         context: {
//           // Data passed to context is available
//           // in page queries as GraphQL variables.
//           slug: node.slug,
//           languages,
//           defaultLanguage,
//           lang,
//           toc,
//           siteUrl: siteUrl[process.env.GATSBY_BUILD_MODE],
//         },
//       })
//     })

//     // Create post pages
//     partners.forEach(({ node }) => {
//       node.application_stores
//         .filter(
//           application_store =>
//             application_store.application.authorization_grant_type ===
//             "password"
//         )
//         .forEach(application_store => {
//           // This part here defines, that our posts will use
//           // a `/:slug/` permalink.
//           node.url = `${lang}/partner/${application_store.application.name.toLowerCase()}`

//           console.log(node.url)

//           createPage({
//             path: node.url,
//             component: partnersTemplate,
//             context: {
//               // Data passed to context is available
//               // in page queries as GraphQL variables.
//               languages,
//               defaultLanguage,
//               lang,
//               partner: node,
//               application_store: application_store,
//               siteUrl: siteUrl[process.env.GATSBY_BUILD_MODE],
//             },
//           })
//         })
//     })

//     // Create post pages
//     posts.forEach(({ node }) => {
//       // This part here defines, that our posts will use
//       // a `/:slug/` permalink.
//       node.url = `${lang}/posts/${node.slug}`

//       console.log(node.url)

//       const toc = tableOfContents.find(
//         edge => edge.node.context.slug === node.slug
//       ).node.tableOfContents

//       createPage({
//         path: node.url,
//         component: postTemplate,
//         context: {
//           // Data passed to context is available
//           // in page queries as GraphQL variables.
//           slug: node.slug,
//           languages,
//           defaultLanguage,
//           lang,
//           toc,
//           siteUrl: siteUrl[process.env.GATSBY_BUILD_MODE],
//         },
//       })
//     })

//     // Create pagination
//     paginate({
//       createPage,
//       items: posts,
//       itemsPerPage: postsPerPage,
//       component: indexTemplate,
//       context: {
//         languages,
//         defaultLanguage,
//         lang,
//         siteUrl: siteUrl[process.env.GATSBY_BUILD_MODE],
//       },
//       pathPrefix: ({ pageNumber }) => {
//         if (pageNumber === 0) {
//           return `${lang}/posts/`
//         } else {
//           return `${lang}/posts/page`
//         }
//       },
//     })

//     Object.entries(landingData).forEach(([key, data]) => {
//       // This part here defines, that our pages will use
//       // a `/:slug/` permalink.
//       const url = `${lang}/landing/${key}`

//       console.log(url)

//       createPage({
//         path: url,
//         component: landingTemplate,
//         context: {
//           pageKey: key,
//           // Data passed to context is available
//           // in page queries as GraphQL variables.
//           ...data,
//           languages,
//           defaultLanguage,
//           lang,
//           siteUrl: siteUrl[process.env.GATSBY_BUILD_MODE],
//         },
//       })
//     })
//   })
// }
