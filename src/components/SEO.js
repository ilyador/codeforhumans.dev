import * as React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'
import ogImage from '../img/seo-cover.jpg'


export default function SEO ({ title, description, meta, lang }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            siteUrl
            openGraph {
              locale
            }
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description
  const language = lang || site.siteMetadata.openGraph?.locale
  const defaultTitle = site.siteMetadata?.title
  const domain = site.siteMetadata.siteUrl

  return (
    <Helmet
      htmlAttributes={{
        lang: language
      }}
      title={title}
      titleTemplate={defaultTitle ? `%s · ${defaultTitle}` : null}
      defaultTitle={defaultTitle}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          property: `og:image`,
          content: domain + ogImage,
        }
      ].concat(meta || [])}
    />
  )
}
