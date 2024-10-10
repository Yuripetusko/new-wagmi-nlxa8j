import { http, createConfig } from 'wagmi';
import { baseSepolia, Chain } from 'wagmi/chains';
import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import {
  coinbaseWallet,
  metaMaskWallet,
  injectedWallet,
  walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { Transport } from 'viem';

export const supportedChains = [baseSepolia] as const;
export type SupportedChainId = (typeof supportedChains)[number]['id'];
export const supportedChainIds: SupportedChainId[] = supportedChains.map(
  (chain) => chain.id
);

const projectId = '3bf1e3221ac1181371ad369b88e990d2';

coinbaseWallet.preference = 'all';

const customMainWallets = [
  coinbaseWallet,
  injectedWallet,
  metaMaskWallet,
  walletConnectWallet,
];

export const httpTransports: Record<Chain['id'], Transport> = {};
for (const chain of supportedChains) {
  httpTransports[chain.id] = http();
}

export const connectors = connectorsForWallets(
  [
    {
      groupName: 'Recommended',
      wallets: customMainWallets,
    },
  ],
  { projectId, appName: 'Your App' }
);

export const config = createConfig({
  chains: supportedChains,
  connectors,
  transports: httpTransports,
});

declare module 'wagmi' {
  interface Register {
    config: typeof config;
  }
}
