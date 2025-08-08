import withBundleAnalyzerInit from '@next/bundle-analyzer';
import withSerwistInit from '@serwist/next';
import type { NextConfig } from 'next';

const withBundleAnalyzer = withBundleAnalyzerInit({
  enabled: process.env.ANALYZE === 'true',
});

const withSerwist = withSerwistInit({
  swSrc: './sw.ts',
  swDest: 'public/sw.js',
  disable: process.env.NODE_ENV === 'development',
  exclude: [/syntax/i],
  register: false,
  maximumFileSizeToCacheInBytes: 1024 * 1024,
});

const nextConfig: NextConfig = {
  compiler: {
    reactRemoveProperties: { properties: ['^data-testid$'] },
  },

  webpack(config) {
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.('.svg'),
    );

    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/,
      },
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: {
          not: [...fileLoaderRule.resourceQuery.not, /url/],
        },
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              icon: true,
              svgo: true,
              replaceAttrValues: {
                '#fff': 'currentcolor',
                '#FFF': 'currentcolor',
                '#FFFFFF': 'currentcolor',
              },
              svgProps: { className: 'icon' },
            },
          },
        ],
      },
    );

    fileLoaderRule.exclude = /\.svg$/i;

    config.module.rules.push({
      test: /\.m?js$/,
      resolve: { fullySpecified: false },
    });

    config.resolve.alias['cross-fetch'] = false;
    return config;
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          {
            key: 'X-Recruiting',
            value: 'We are hiring! Check https://comacpro.com for more info!',
          },
        ],
      },
      {
        source: '/.well-known/apple-app-site-association',
        headers: [
          { key: 'Content-Type', value: 'application/json' },
          { key: 'Cache-Control', value: 'no-cache' },
        ],
      },
    ];
  },

  poweredByHeader: false,
  reactStrictMode: false,
  productionBrowserSourceMaps: process.env.SOURCE_MAPS === 'true',
};

export default withSerwist(withBundleAnalyzer(nextConfig));
