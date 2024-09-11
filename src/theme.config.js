import { useConfig } from 'nextra-theme-docs'

/* eslint sort-keys: error */
/**
 * @type {import('nextra-theme-docs').DocsThemeConfig}
 */
export default {
  // chat: {
  //   link: 'https://discord.gg/hEM84NMkRv' // Next.js discord server,
  // },
  logo: ({ locale }) => (
      <>
        <span className="mr-2 hidden font-extrabold md:inline">Agent</span>
        <span className="hidden font-normal text-gray-600 md:inline">
        工程指南
      </span>
      </>
  ),
  sidebar: {
    defaultMenuCollapseLevel: 1
  },
  // eslint-disable-next-line sort-keys
  footer: {
    text: `MIT ${new Date().getFullYear()} © Yang Yang.`
  },
  // eslint-disable-next-line sort-keys
  docsRepositoryBase:
    'https://github.com/yang20150702/agent-guide/tree/main',
  editLink: {
    text: 'Edit this page on GitHub'
  },
  faviconGlyph: '✦',
  useNextSeoProps() {
    const { frontMatter } = useConfig()
    return {
      additionalLinkTags: [
        {
          href: '/apple-icon-180x180.png',
          rel: 'apple-touch-icon',
          sizes: '180x180'
        },
        {
          href: '/android-icon-192x192.png',
          rel: 'icon',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          href: '/favicon-96x96.png',
          rel: 'icon',
          sizes: '96x96',
          type: 'image/png'
        },
        {
          href: '/favicon-32x32.png',
          rel: 'icon',
          sizes: '32x32',
          type: 'image/png'
        },
        {
          href: '/favicon-16x16.png',
          rel: 'icon',
          sizes: '16x16',
          type: 'image/png'
        }
      ],
      additionalMetaTags: [
        { content: 'zh', httpEquiv: 'Content-Language' },
        { content: 'Nextra', name: 'apple-mobile-web-app-title' },
        { content: '#fff', name: 'msapplication-TileColor' },
        { content: '/ms-icon-144x144.png', name: 'msapplication-TileImage' }
      ],
      description:
        frontMatter.description || 'Nextra: the Next.js site builder',
      openGraph: {
        images: [
          { url: frontMatter.image || 'https://nextra.vercel.app/og.png' }
        ]
      },
      titleTemplate: '%s – Nextra',
      // twitter: {
      //   cardType: 'summary_large_image',
      //   site: 'https://nextra.vercel.app'
      // }
    }
  }
}
