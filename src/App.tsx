import { useAccount, useConnect, useDisconnect, useWriteContract } from 'wagmi';
import { WalletConnectButton } from './wallet-button';
import { Flex, Heading, Box, Button, Alert } from '@chakra-ui/react';
import { baseSepolia } from 'viem/chains';
import { erc20Abi, parseEther, zeroAddress } from 'viem';

function App() {
  const account = useAccount();
  const { status, error } = useConnect();
  const { disconnect } = useDisconnect();

  const onDisconnect = () => {
    disconnect();
  };

  const transferWethResponse = useWriteContract();

  const onTransfer = () => {
    if (!account.address) {
      throw new Error('Account not connected');
    }
    transferWethResponse.writeContract({
      chainId: baseSepolia.id,
      address: '0x4200000000000000000000000000000000000006',
      abi: erc20Abi,
      functionName: 'transferFrom',
      args: [account.address ?? zeroAddress, zeroAddress, parseEther('0.01')],
    });
  };

  return (
    <Flex direction="column" gap={8} padding={4}>
      <Heading as="h2" fontSize="lg">
        Account
      </Heading>

      <WalletConnectButton />

      {account.isConnected && (
        <Button onClick={onTransfer}>Transfer 0.01 ETH to zero address</Button>
      )}

      {account.isConnected && (
        <Button onClick={onDisconnect}>Disconnect</Button>
      )}
    </Flex>
  );
}

export default App;
