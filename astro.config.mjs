import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
// import starlightLinksValidator from 'starlight-links-validator';
// import starlightUtils from '@lorenzo_lewis/starlight-utils';
// import markdoc from '@astrojs/markdoc';
import remarkExternalLinks from 'remark-external-links';
import vercel from '@astrojs/vercel/serverless';
import rehypeExternalLinks from 'rehype-external-links';

export default defineConfig({
  output: 'server',
  adapter: vercel({
    webAnalytics: { enabled: true }
  }),
  integrations: [
    starlight({
      title: 'Frome GenAI Project',
      customCss: [
        './src/styles/custom.css'
      ],
       sidebar: [
		{ label: 'Home', link: '/'},
        {
          label: 'Sample policies',
          autogenerate: {directory: 'sample-policies'},
		},
	],
      head: [
        {
          tag: 'script',
          attrs: {
            src: '/js/nutshell.js',
            defer: true,
          }
        },
        {
          tag: 'script',
          attrs: {
            src: '/nutshell-config.js',
            defer: true,
          }
        },
		{
			tag: 'script',
			attrs: {
				src: 'https://cloud.umami.is/script.js',
				'data-website-id': '838e59e6-d2b1-4478-9d00-fa6d3a81d3d2',
				defer: true,
				},
			},
      ],
    }),
  ],
  markdown: {
    remarkPlugins: [
      [remarkExternalLinks, { target: '_blank', rel: ['noopener', 'noreferrer'] }]
    ],
    rehypePlugins: [
      [
        rehypeExternalLinks,
        {
          content: { type: 'text', value: ' 🡕' }
        }
      ],
    ],
  },
});
