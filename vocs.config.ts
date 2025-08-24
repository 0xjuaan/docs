import { defineConfig } from 'vocs'

export default defineConfig({
  title: 'hyper-evm-lib',
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
