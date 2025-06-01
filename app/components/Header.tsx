"use client";

import { useAccount, useDisconnect } from "wagmi";
import ConnectWallet from "./ConnectWallet";
import { Button, Navbar } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { Alert } from "react-bootstrap";
import { shortenAddress } from "../util/string";
import Link from "next/link";

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
            <Link
              href="events/create"
              className="me-3 text-white text-decoration-none"
            >
              Create event
            </Link>
            <Link
              href="events"
              className="me-3 text-white text-decoration-none"
            >
              Events
            </Link>
            <Link
              href="tickets"
              className="me-3 text-white text-decoration-none"
            >
              Tickets
            </Link>
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
