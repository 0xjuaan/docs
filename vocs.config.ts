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
        { text: 'Overview', link: '/intro/overview' },
        { text: 'Getting Started', link: '/intro/getting-started' },
      ],
    },
    {
      text: 'Development',
      items: [
        { text: 'CoreWriterLib', link: '/dev/corewriter' },
        { text: 'PrecompileLib', link: '/dev/precompiles' },
        { text: 'TokenRegistry', link: '/dev/token-registry' },
      ],
    },
    {
      text: 'Testing Framework',
      items: [
        { text: 'Overview', link: '/testing/overview' },
        { text: 'Quick start', link: '/testing/quick-start' },
        { text: 'Cheatcodes', link: '/testing/cheatcodes' },
      ],
    },
    { text: 'Examples', link: '/example' },
  ],
})