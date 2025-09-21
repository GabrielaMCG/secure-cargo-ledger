import React from 'react';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RainbowKitProvider, getDefaultConfig } from '@rainbow-me/rainbowkit';
import { sepolia } from 'wagmi/chains';
import { CHAIN_ID, RPC_URL, WALLET_CONNECT_PROJECT_ID } from '../../config';

import '@rainbow-me/rainbowkit/styles.css';

const config = getDefaultConfig({
  appName: 'Secure Cargo Ledger',
  projectId: WALLET_CONNECT_PROJECT_ID,
  chains: [sepolia],
  ssr: false,
});

const queryClient = new QueryClient();

interface WalletProviderProps {
  children: React.ReactNode;
}

export function WalletProvider({ children }: WalletProviderProps) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
