import { useAccount, useReadContract, useReadContracts } from "wagmi";
import ticketMasterAbi from "./../abi/TicketMaster";
import { CONTRACT_ADDRESS } from "./../abi/TicketMaster";
import { ParsedEvent } from "../types/ParsedEvent";
import { useEffect } from "react";

export type EventDetailsReturned = [
  bigint,
  string,
  string,
  string,
  bigint,
  bigint,
  bigint,
  bigint,
  boolean
];

export function useHeldEvents() {
  const { address, isConnected } = useAccount();

  const {
    data: eventIdsData,
    isLoading: isFetchingEventIds,
    error: fetchEventIdsError,
  } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: ticketMasterAbi,
    functionName: "getEventIdsByOrganizer",
    args: [address],
    query: {
      enabled: !!address && isConnected,
    },
  });

  const eventIds = (eventIdsData as bigint[]) || [];
  const shouldFetchEvents = eventIds && eventIds.length > 0;

  const {
    data: eventsList,
    isLoading: isFetchingEvents,
    error: fetchEventsError,
  } = useReadContracts({
    contracts: eventIds.map((id) => ({
      address: CONTRACT_ADDRESS,
      abi: ticketMasterAbi,
      functionName: "getEvent",
      args: [id],
    })),
    allowFailure: false,
    query: {
      enabled: !!address && isConnected && shouldFetchEvents,
    },
  });

  const returnedEvents = (eventsList as Array<EventDetailsReturned>) || [];

  const parsedEvents = returnedEvents.map((event) => {
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
    ] = event;

    return {
      id: Number(id),
      organizer,
      name,
      description,
      dateTime: Number(dateTime),
      price: Number(price) / 1e18,
      maxTickets: Number(maxTickets),
      ticketsSold: Number(ticketsSold),
      isActive,
    };
  });

  return {
    events: parsedEvents,
    loading: isFetchingEventIds || isFetchingEvents,
    error: { fetchEventIdsError, fetchEventsError },
  };
}
