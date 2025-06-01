"use client";

import { useHeldEvents } from "../hooks/useHeldEvents";
import { ParsedEvent } from "../types/ParsedEvent";

export default function Events() {
  const { events, loading, error } = useHeldEvents();

  if (loading) return <div>Loading...</div>;

  if (error) {
    return <div>error occurred</div>;
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
