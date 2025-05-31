import { useAccount, useReadContract, useReadContracts } from "wagmi";
import ticketMasterAbi from "./../abi/TicketMaster";
import { CONTRACT_ADDRESS } from "./../abi/TicketMaster";
import type { Abi } from "viem";
import { ParsedEvent } from "../types/ParsedEvent";

export function useHeldEvents() {
  const { address } = useAccount();

  // 1. Fetch event IDs for this organizer
  const {
    data: eventIdsData,
    isLoading: isFetchingEventIds,
    error: fetchEventIdsError,
  } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: ticketMasterAbi as Abi,
    functionName: "getEventIdsByOrganizer",
    args: [address],
  });

  const eventIds = eventIdsData as bigint[] | undefined;
  console.log(eventIds);
  const shouldFetchEvents = eventIds && eventIds.length > 0;

  // 2. Fetch each event’s details
  const {
    data: eventsList,
    isLoading: isFetchingEvents,
    error: fetchEventsError,
  } = useReadContracts({
    contracts: shouldFetchEvents
      ? eventIds.map((id) => ({
          address: CONTRACT_ADDRESS as `0x${string}`,
          abi: ticketMasterAbi as Abi,
          functionName: "getEvent",
          args: [id],
        }))
      : [],
    allowFailure: false,
  });

  // 3. Parse data
  const parsedEvents: ParsedEvent[] = (
    (eventsList as Array<{ status: "success"; result: unknown }>) ?? []
  )
    .filter((e) => e.status === "success")
    .map((event) => {
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
      ] = event.result as [
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
    error: (fetchEventIdsError || fetchEventsError) as any,
  };
}
