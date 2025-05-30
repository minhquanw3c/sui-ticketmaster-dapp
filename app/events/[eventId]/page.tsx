"use client";

import { useParams } from "next/navigation";
import { useReadContract, useWriteContract } from "wagmi";
import ticketMasterAbi from "@/app/abi/TicketMaster";
import { CONTRACT_ADDRESS } from "@/app/abi/TicketMaster";
import type { Abi } from "viem";
import { useEffect, useState } from "react";
import { ParsedEvent } from "@/app/types/ParsedEvent";
import { formatEther, parseEther } from "ethers";

export default function EventDetails() {
  const { eventId } = useParams();
  const [eventDetails, setEventDetails] = useState<ParsedEvent | undefined>(
    undefined
  );
  const { data: hash, isPending, writeContract } = useWriteContract();
  // const [form, setForm] = useState({ attendeeName: "" });

  const { data: eventData, isLoading } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: ticketMasterAbi as Abi,
    functionName: "getEvent",
    args: [BigInt(eventId as string)],
  });

  // const handleChange = (e: any) => {
  //   setForm({ ...form, [e.target.name]: e.target.value });
  // };

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

  if (!eventDetails || isLoading) {
    return <>Loading...</>;
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
      {/* <input
        type="text"
        name="attendeeName"
        value={form.attendeeName}
        onChange={handleChange}
        placeholder="Enter attendee name"
        className="form-control mb-3"
      /> */}
      <button className="btn btn-success" onClick={mint} disabled={isPending}>
        {isPending ? "Minting" : "Buy"}
      </button>
    </div>
  );
}
