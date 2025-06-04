import { useAccount, useReadContract, useReadContracts } from "wagmi";
import ticketMasterAbi from "./../abi/TicketMaster";
import { CONTRACT_ADDRESS } from "./../abi/TicketMaster";
import { ParsedEvent } from "../types/ParsedEvent";
import { useEffect } from "react";

export function useBrowseEvents() {
  const { address, isConnected } = useAccount();

  const {
    data: fetchedEvents,
    isLoading: isFetchingEvents,
    error: fetchEventsError,
  } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: ticketMasterAbi,
    functionName: "getAllEvents",
    args: [],
    query: {
      enabled: !!address && isConnected,
    },
  });

  const transformedEvents = (fetchedEvents as ParsedEvent[]) || [];

  useEffect(() => {
    console.log(fetchEventsError);
  }, [fetchEventsError]);

  const parsedEvents = transformedEvents
    .filter((e) => e.organizer !== address)
    .map((event) => {
      return {
        id: Number(event.id),
        organizer: event.organizer,
        name: event.name,
        description: event.description,
        dateTime: Number(event.dateTime),
        price: Number(event.price) / 1e18,
        maxTickets: Number(event.maxTickets),
        ticketsSold: Number(event.ticketsSold),
        isActive: event.isActive,
      };
    });

  return {
    events: parsedEvents,
    loading: isFetchingEvents,
    error: { fetchEventsError },
  };
}
