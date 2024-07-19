/**
 * @type {import('next').NextConfig}
 */
try {
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
  })

  module.exports = withNextra(nextConfig) //export the config as a dependency
} catch (err) {
  if (!(err instanceof Error)) {
    throw new Error('An unknown error occurred');
  }
  console.log("err: ", err)
  throw err;
}