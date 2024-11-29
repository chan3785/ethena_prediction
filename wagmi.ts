import { createConfig, http } from 'wagmi';

import { sepolia } from 'wagmi/chains';
import { metaMask } from 'wagmi/connectors';

export const config = createConfig({
  chains: [sepolia],
  connectors: [metaMask()],
  ssr: true,
  multiInjectedProviderDiscovery: false,
  transports: {
    [sepolia.id]: http()
  }
});

declare module 'wagmi' {
  interface Register {
    config: typeof config;
  }
}
