import { injected, walletlink, walletconnect } from "src/utils/connectors";

export const ConnectorNames = {
    MetaMask: "MetaMask",
    WalletLink: "WalletLink",
    WalletConnect: "WalletConnect"
};

export const connectorsByName = {
    [ConnectorNames.MetaMask]: injected,
    [ConnectorNames.WalletLink]: walletlink,
    [ConnectorNames.WalletConnect]: walletconnect,
};
