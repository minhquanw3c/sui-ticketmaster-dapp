"use client";

import { useAccount, useDisconnect } from "wagmi";
import ConnectWallet from "./components/ConnectWallet";
import { Button, Navbar, NavbarBrand } from "react-bootstrap";
import Container from "react-bootstrap/Container";

export default function Home() {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  if (isConnected) {
    return (
      <Navbar className="justify-content-between">
        <Container>
          <NavbarBrand>TicketMaster</NavbarBrand>
          <a href="/events/create">Create new event</a>
          <div>
            <p>Address: {address}</p>
            <Button onClick={() => disconnect()}>Disconnect</Button>
          </div>
        </Container>
      </Navbar>
    );
  }

  return <ConnectWallet />;
}
