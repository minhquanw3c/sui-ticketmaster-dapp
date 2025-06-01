"use client";

import { useAccount, useDisconnect } from "wagmi";
import ConnectWallet from "./ConnectWallet";
import { Button, Navbar } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { Alert } from "react-bootstrap";
import { shortenAddress } from "../util/string";

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
            <a
              href="/events/create"
              className="me-3 text-white text-decoration-none"
            >
              Create event
            </a>
            <a href="/events" className="text-white text-decoration-none me-3">
              Events
            </a>
            <a href="/tickets" className="text-white text-decoration-none">
              Tickets
            </a>
          </div>
          <div className="d-flex align-items-center">
            <p className="mb-0 text-white me-2">
              Address: {shortenAddress(address ? address.toString() : "")}
            </p>
            <Button onClick={() => disconnect()}>Disconnect</Button>
          </div>
        </Container>
      </Navbar>
    );
  }

  return (
    <>
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
      <Container className="mt-5">
        <Alert className="text-center">
          <p>
            Welcome to TicketMaster platform where users can buy tickets for
            their favorite events.
          </p>
          <p className="mb-0">Connect wallet to start.</p>
        </Alert>
      </Container>
    </>
  );
}
