import { Box, Flex, Image } from '@chakra-ui/react';
import {
  useConnectModal,
  useChainModal,
  useAccountModal,
} from '@rainbow-me/rainbowkit';
import React, { ReactNode } from 'react';
import { useAccount, useEnsName } from 'wagmi';
import { Address, zeroAddress } from 'viem';
import { supportedChainIds } from './wagmi';
import { normalize } from 'viem/ens';

export const shortenAccountIdEvm = (
  id: Address | undefined,
  inMiddle?: boolean,
  sliceSize = 4
) => {
  if (id) {
    const beginning = id.slice(2, inMiddle ? sliceSize + 2 : 12);
    const end = id.slice(-sliceSize);

    return inMiddle
      ? `0x${beginning}...${end}`
      : `${beginning}${id.length > 12 ? '...' : ''}`;
  }

  return '';
};

type Props = {
  children: ({
    content,
    onClick,
  }: {
    content: ReactNode;
    onClick: () => void;
  }) => ReactNode;
};

export const RainbowConnectButtonWrapper = ({ children }: Props) => {
  const { openConnectModal } = useConnectModal();
  const { openChainModal } = useChainModal();
  const { openAccountModal } = useAccountModal();
  const { chain, address, isConnected } = useAccount();

  const ensNameResult = useEnsName({
    address: address ?? zeroAddress,
    query: { enabled: isConnected && !!address },
  });

  const ensName = ensNameResult.data
    ? normalize(ensNameResult.data)
    : undefined;

  const displayName = ensName ?? shortenAccountIdEvm(address);

  const isNotConnected = !address || !chain || !isConnected;
  const isUnsupported = chain && !supportedChainIds.includes(chain.id);

  const onClick = () =>
    isConnected
      ? isUnsupported
        ? openChainModal?.()
        : openAccountModal?.()
      : openConnectModal?.();

  const content = (
    <Flex p={2} align="center" justify="space-between">
      {isConnected ? (
        <>
          {isUnsupported ? <Box>Wrong network</Box> : <Box>{displayName}</Box>}
        </>
      ) : (
        <Box>Connect EVM Wallet</Box>
      )}
    </Flex>
  );
  return (
    <>
      {children({
        content,
        onClick,
      })}
    </>
  );
};
