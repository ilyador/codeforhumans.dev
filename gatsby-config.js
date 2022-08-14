module.exports = {
  siteMetadata: {
    title: `Code For Humans`,
    author: {
      name: `Ilya Dorman`,
      summary: `I mentor self-learning devs (mostly women) with the technical ⌨️ mental 🧠 & emotional ❤️ challenges of learning.`
    },
    description: `Get the best mindset to become independent, confident, and quick-learning coder. Build products or get the dream job! 🪐✨`,
    siteUrl: `https://www.codeforhumans.info/`,
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: 'https://www.codeforhumans.info/',
      site_name: 'Code For Humans',
    }
  },
  plugins: [
    {
      resolve: "gatsby-source-google-docs",
      options: {
        folder: "1Ciyh22DLQ9TuIV5cr1u3H1eheKESmDl_"
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 700,
              linkImagesToOriginal: false,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-gdpr-cookies`,
      options: {
        googleAnalytics: {
          trackingId: 'UA-72818819-3',
          anonymize: true
        },
        environments: ['production', 'development']
      }
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-72818819-3`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Code For Humans`,
        short_name: `CodeForHumans`,
        start_url: `/`,
        background_color: `#000`,
        theme_color: `#d2232a`,
        display: `minimal-ui`,
        icon: `content/assets/logo.png`,
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`
  ],
}
