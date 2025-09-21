import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useDisconnect } from 'wagmi';
import { Button } from "@/components/ui/button";
import { Wallet, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const WalletConnect = () => {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { toast } = useToast();

  const handleDisconnect = () => {
    disconnect();
    toast({
      title: "Wallet Disconnected",
      description: "Reconnect to access trade finance features",
    });
  };

  if (isConnected && address) {
    return (
      <div className="flex items-center space-x-3 bg-card border border-border rounded-lg p-3">
        <CheckCircle className="w-5 h-5 text-primary" />
        <div className="flex-1">
          <div className="text-sm font-medium text-foreground">Wallet Connected</div>
          <div className="text-xs text-muted-foreground">
            {address.slice(0, 6)}...{address.slice(-4)}
          </div>
        </div>
        <Button 
          variant="outline" 
          size="sm"
          onClick={handleDisconnect}
          className="text-xs"
        >
          Disconnect
        </Button>
      </div>
    );
  }

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus ||
            authenticationStatus === 'authenticated');

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              'style': {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <Button 
                    onClick={openConnectModal}
                    className="bg-gradient-container hover:bg-gradient-container/90 text-accent-foreground font-semibold px-6 py-3 rounded-lg shadow-container transition-all duration-300 hover:shadow-glow"
                  >
                    <Wallet className="w-4 h-4 mr-2" />
                    Connect Wallet
                  </Button>
                );
              }

              if (chain.unsupported) {
                return (
                  <Button 
                    onClick={openChainModal}
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-lg"
                  >
                    Wrong network
                  </Button>
                );
              }

              return (
                <div className="flex items-center space-x-3 bg-card border border-border rounded-lg p-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-foreground">Wallet Connected</div>
                    <div className="text-xs text-muted-foreground">
                      {account.displayName}
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={openAccountModal}
                    className="text-xs"
                  >
                    Account
                  </Button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

export default WalletConnect;