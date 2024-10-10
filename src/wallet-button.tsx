import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Box, Button, ButtonProps } from '@chakra-ui/react';

interface IProps {
  width?: ButtonProps['width'];
  size?: ButtonProps['size'];
  variant?: ButtonProps['variant'];
  colorScheme?: ButtonProps['colorScheme'];
  showIcon?: boolean;
  connectCopy?: string;
  isDisabled?: boolean;
}

/**
 * For a MenuItem version of this component see {@link RainbowKitConnectMenuItem}
 */
export const WalletConnectButton = ({
  width,
  size = 'md',
  variant = 'outline',
  colorScheme = 'gray',
  connectCopy = 'Connect Wallet',
  showIcon = true,
  isDisabled,
}: IProps) => (
  <ConnectButton.Custom>
    {({
      account,
      chain,
      openAccountModal,
      openChainModal,
      openConnectModal,
      mounted,
    }) => {
      return (
        <Box
          width={width}
          aria-hidden={!mounted}
          opacity={mounted ? 1 : 0}
          pointerEvents={mounted ? 'all' : 'none'}
          userSelect={mounted ? 'auto' : 'none'}
        >
          {(() => {
            if (!mounted || !account || !chain) {
              return (
                <Button
                  data-name={'connect-evm-wallet'}
                  onClick={openConnectModal}
                  size={size}
                  width={'100%'}
                  variant={variant}
                  colorScheme={colorScheme}
                  isDisabled={isDisabled}
                >
                  {connectCopy}
                </Button>
              );
            }

            if (chain.unsupported) {
              return (
                <Button
                  onClick={openChainModal}
                  size={size}
                  width={'100%'}
                  variant={variant}
                  colorScheme={colorScheme}
                  isDisabled={isDisabled}
                >
                  Wrong network
                </Button>
              );
            }

            return (
              <Button
                data-name={'wallet-switch'}
                onClick={openAccountModal}
                size={size}
                width={'100%'}
                variant={variant}
                colorScheme={colorScheme}
                isDisabled={isDisabled}
              >
                {account.displayName}
              </Button>
            );
          })()}
        </Box>
      );
    }}
  </ConnectButton.Custom>
);
