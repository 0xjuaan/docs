import { defineConfig } from 'vocs'

export default defineConfig({
  title: 'hyper-evm-lib',
  theme: {
    accentColor: {
      dark: '#42e7d7',
      // light: '#f98a1a', -- darker orange than the one below
      light: '#12a787',
    },
  },
  sidebar: [
    {
      text: 'Getting Started',
      link: '/getting-started',
    },
    {
      text: 'Components',
      items: [
        { text: 'CoreWriterLib', link: '/corewriter' },
        { text: 'PrecompileLib', link: '/precompiles' },
        { text: 'TokenRegistry', link: '/token-registry' },
      ],
    },
    { text: 'Testing Framework', link: '/testing-framework' },
    { text: 'Examples', link: '/example' },
    { text: 'Security', link: '/security' },
    { text: 'Contributing', link: '/contributing' },
  ],
})