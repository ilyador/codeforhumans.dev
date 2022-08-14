const path = require(`path`)


exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const googleDocsPost = path.resolve(`./src/templates/blog-post.js`)


  const result = await graphql(
    `
      {
        allGoogleDocs(
          filter: { path: {regex: "/blog/"} }
          sort: { fields: date, order: DESC }
          limit: 1000
        )
         {
          nodes {
            slug
            name
          }
        }
      }
    `
  )

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      result.errors
    )
    return
  }

  // Create blog posts pages.
  const docs = result.data.allGoogleDocs.nodes

  docs.forEach((doc, index) => {
    const previous = index === docs.length - 1 ? null : docs[index + 1]
    const next = index === 0 ? null : docs[index - 1]

    createPage({
      path: doc.slug,
      component: googleDocsPost,
      context: {
        previous: previous && {
          link: previous.slug,
          title: previous.name
        },
        next: next && {
          link: next.slug,
          title: next.name
        }
      }
    })
  })
}


exports.onCreatePage = async ({ actions }) => {
  const { createPage } = actions

  createPage({
    path: '/webinar/*',
    matchPath: '/webinar/:meetingId/:product',
    component: path.resolve(`src/pages/webinar.js`)
  })

  createPage({
    path: '/direct-payment/*',
    matchPath: '/direct-payment/:amount',
    component: path.resolve(`src/pages/direct-payment.js`)
  })

  createPage({
    path: '/mentorship/*',
    matchPath: '/mentorship/:specialPrice',
    component: path.resolve(`src/pages/mentorship.js`)
  })
}