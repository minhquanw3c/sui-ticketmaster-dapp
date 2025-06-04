import { useAccount, useReadContract, useReadContracts } from "wagmi";
import ticketMasterAbi from "./../abi/TicketMaster";
import { CONTRACT_ADDRESS } from "./../abi/TicketMaster";
import { useEffect } from "react";

export type TicketDetailsReturned = [bigint, string, bigint, string];

export function useBoughtTickets() {
  const { address, isConnected } = useAccount();

  const {
    data: ticketIdsData,
    isLoading: isFetchingTicketIds,
    error: fetchTicketIdsError,
  } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: ticketMasterAbi,
    functionName: "getBoughtTickets",
    args: [address],
    query: {
      enabled: !!address && isConnected,
    },
  });

  const ticketIds = (ticketIdsData as bigint[]) || [];
  const shouldFetchTickets = ticketIds && ticketIds.length > 0;

  const {
    data: ticketsList,
    isLoading: isFetchingTickets,
    error: fetchTicketsError,
  } = useReadContracts({
    contracts: ticketIds.map((id) => ({
      address: CONTRACT_ADDRESS,
      abi: ticketMasterAbi,
      functionName: "getTicket",
      args: [id],
    })),
    allowFailure: false,
    query: {
      enabled: !!address && isConnected && shouldFetchTickets,
    },
  });

  const returnedTickets = (ticketsList as Array<TicketDetailsReturned>) || [];

  const parsedTickets = returnedTickets.map((ticket) => {
    const [id, buyer, eventId, notes] = ticket;

    return {
      id: Number(id),
      buyer,
      eventId: Number(eventId),
      notes,
    };
  });

  return {
    tickets: parsedTickets,
    loading: isFetchingTicketIds || isFetchingTickets,
    error: { fetchTicketIdsError, fetchTicketsError },
  };
}
