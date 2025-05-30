"use client";

import { useAccount, useDisconnect } from "wagmi";
import ConnectWallet from "./ConnectWallet";
import { Button, Navbar, NavbarBrand } from "react-bootstrap";
import Container from "react-bootstrap/Container";

export default function Header() {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  if (isConnected) {
    return (
      <Navbar className="justify-content-between bg-dark" variant="dark">
        <Container>
          <div>
            <Navbar.Brand href="/" className="text-white">
              TicketMaster
            </Navbar.Brand>
            <a href="/events/create">Create new event</a>
          </div>
          <div className="d-flex align-items-center">
            <p className="mb-0 text-white ms-2">Address: {address}</p>
            <Button onClick={() => disconnect()}>Disconnect</Button>
          </div>
        </Container>
      </Navbar>
    );
  }

  return (
    <Navbar className="justify-content-between bg-dark">
      <Container>
        <div>
          <Navbar.Brand href="/" className="text-white">
            TicketMaster
          </Navbar.Brand>
        </div>
        <div>
          <ConnectWallet />
        </div>
      </Container>
    </Navbar>
  );
}
