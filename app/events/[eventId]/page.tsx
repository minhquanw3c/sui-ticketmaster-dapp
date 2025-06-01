"use client";

import { useParams } from "next/navigation";
import { useReadContract, useWriteContract } from "wagmi";
import ticketMasterAbi from "@/app/abi/TicketMaster";
import { CONTRACT_ADDRESS } from "@/app/abi/TicketMaster";
import { useEffect, useState } from "react";
import { ParsedEvent } from "@/app/types/ParsedEvent";
import { formatEther } from "ethers";
import { useAccount } from "wagmi";
import { Card, Badge } from "react-bootstrap";
import { shortenAddress } from "@/app/util/string";

export default function EventDetails() {
  const { eventId } = useParams();
  const [eventDetails, setEventDetails] = useState<ParsedEvent | undefined>(
    undefined
  );

  const { data: hash, isPending, writeContract } = useWriteContract();
  const { address, isConnected } = useAccount();

  const {
    data: eventData,
    isPending: isLoadingEvent,
    error: errorOnFetch,
  } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: ticketMasterAbi,
    functionName: "getEvent",
    args: [BigInt(eventId as string)],
    query: {
      enabled: !!address && isConnected,
    },
  });

  const mint = async () => {
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: ticketMasterAbi,
      functionName: "mintTicket",
      args: [eventId],
      value: BigInt(eventDetails!.price),
    });
  };

  useEffect(() => {
    if (eventData) {
      const [
        id,
        organizer,
        name,
        description,
        dateTime,
        price,
        maxTickets,
        ticketsSold,
        isActive,
      ] = eventData as any[];

      setEventDetails({
        id: Number(id),
        organizer,
        name,
        description,
        dateTime: Number(dateTime),
        price: Number(price),
        maxTickets: Number(maxTickets),
        ticketsSold: Number(ticketsSold),
        isActive,
      });
    }
  }, [eventData]);

  if (isLoadingEvent) {
    return <>Loading...</>;
  }

  if (errorOnFetch || !eventDetails) {
    console.log(errorOnFetch);
    return <>Error</>;
  }

  return (
    <>
      <Card>
        <Card.Header>Buy a ticket</Card.Header>
        <Card.Body>
          <ul>
            <li>Event: {eventDetails.name}</li>
            <li>Organizer: {shortenAddress(eventDetails.organizer)}</li>
            <li>Name: {eventDetails.name}</li>
            <li>Price per a ticket: {eventDetails.price}</li>
            <li>Max tickets capacity: {eventDetails.maxTickets}</li>
            <li>Tickets sold: {eventDetails.ticketsSold}</li>
            <li>
              Status:{" "}
              {eventDetails.isActive ? (
                <Badge bg="success">On going</Badge>
              ) : (
                <Badge bg="danger">Closed</Badge>
              )}
            </li>
          </ul>
        </Card.Body>
        <Card.Footer>
          <button
            className="btn btn-primary px-4"
            onClick={mint}
            disabled={isPending}
          >
            {isPending ? "Minting" : "Buy"}
          </button>
        </Card.Footer>
      </Card>
    </>
  );
}
