import { http, createConfig } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
import { injected } from 'wagmi/connectors';

export const config = createConfig({
  chains: [sepolia, mainnet], // sepolia = testnet buat development dulu
  connectors: [injected()],   // deteksi MetaMask/Rabby yang terpasang di browser
  transports: {
    [sepolia.id]: http(),
    [mainnet.id]: http(),
  },
});