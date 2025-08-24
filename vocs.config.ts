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
      text: 'Introduction',
      items: [
        { text: 'Getting Started', link: '/getting-started' },
      ],
    },
    {
      text: 'Development',
      items: [
        { text: 'CoreWriterLib', link: '/corewriter' },
        { text: 'PrecompileLib', link: '/precompiles' },
        { text: 'TokenRegistry', link: '/token-registry' },
      ],
    },
    {
      text: 'Testing Framework',
      items: [
        { text: 'Quick start', link: '/testing-framework' },
        { text: 'Cheatcodes', link: '/cheatcodes' },
      ],
    },
    { text: 'Examples', link: '/example' },
    { text: 'Contributing', link: '/contributing' },
  ],
})