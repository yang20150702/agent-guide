/**
 * @type {import('next').NextConfig}
 */

const nextConfig = {
  reactStrictMode: true,
  output:'export', // from NextJs v13.3.0 next export is depricated
  images: {
    unoptimized: true, // mandatory, otherwise won't export
  },
  basePath: "",
  //Optional: Change the output directory `out` -> `dist`
//  distDir: "build"

}

const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './src/theme.config.js',
  latex: true,
  flexsearch: {
    codeblock: false
  }
})

module.exports = withNextra(nextConfig) //export the config as a dependency
