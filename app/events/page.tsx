"use client";

import { useHeldEvents } from "../hooks/useHeldEvents";
import { ParsedEvent } from "../types/ParsedEvent";

export default function Events() {
  const {
    events,
    loading,
    error,
  }: { events: ParsedEvent[]; loading: boolean; error: any } = useHeldEvents();

  if (loading) return <div>Loading...</div>;

  if (error) {
    return <>error occurred</>;
  }

  return (
    <>
      <p>
        {events.map((e) => {
          return (
            <ul>
              <li>{e.name}</li>
              <li>{e.description}</li>
            </ul>
          );
        })}
      </p>
    </>
  );
}
