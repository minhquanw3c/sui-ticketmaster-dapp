"use client";

import { useParams } from "next/navigation";
import { useReadContract, useWriteContract } from "wagmi";
import ticketMasterAbi from "@/app/abi/TicketMaster";
import { CONTRACT_ADDRESS } from "@/app/abi/TicketMaster";
import type { Abi } from "viem";
import { useEffect, useState } from "react";
import { ParsedEvent } from "@/app/types/ParsedEvent";
import { formatEther, parseEther } from "ethers";
import { useAccount } from "wagmi";

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
    <div className="container mt-4">
      <h2>Event: {eventDetails.name}</h2>
      <p>Description: {eventDetails.description}</p>
      <p>
        <strong>Date:</strong>{" "}
        {new Date(eventDetails.dateTime * 1000).toLocaleString()}
      </p>
      <p>
        <strong>Price:</strong> {formatEther(eventDetails.price)} ETH
      </p>

      <hr />

      <h5>Buy a Ticket</h5>

      <button className="btn btn-success" onClick={mint} disabled={isPending}>
        {isPending ? "Minting" : "Buy"}
      </button>
    </div>
  );
}
