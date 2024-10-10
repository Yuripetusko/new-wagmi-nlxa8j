import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Buffer } from 'buffer';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { WagmiProvider } from 'wagmi';
import { ChakraProvider, Flex } from '@chakra-ui/react';
import '@rainbow-me/rainbowkit/styles.css';

import App from './App';
import { config } from './wagmi';

import './index.css';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';

globalThis.Buffer = Buffer;

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider resetCSS>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider
            appInfo={{ appName: 'Your app' }}
            showRecentTransactions={true}
            modalSize="compact"
          >
            <App />
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </ChakraProvider>
  </React.StrictMode>
);
