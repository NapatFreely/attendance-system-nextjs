import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()

// Note: Use default value for fix github build fail
const imageDomain = 'test'

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })
    return config
  },
  images: {
    domains: [imageDomain],
    unoptimized: true,
  },
}

export default withNextIntl(nextConfig)
