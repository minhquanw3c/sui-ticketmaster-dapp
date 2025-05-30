"use client";

import { useAccount, useDisconnect } from "wagmi";
import ConnectWallet from "./ConnectWallet";
import { Button } from "react-bootstrap";

export default function Header() {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  if (isConnected) {
    return (
      <>
        <p>Address: {address}</p>
        <Button onClick={() => disconnect()}>Disconnect</Button>
      </>
    );
  }

  return <ConnectWallet />;
}
