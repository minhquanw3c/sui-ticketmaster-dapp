"use client";

import { useHeldEvents } from "../hooks/useHeldEvents";

export default function Events() {
  const { events, loading, err } = useHeldEvents();

  if (loading) return <div>Loading...</div>;

  if (err) {
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
