"use client";

import { Card, Row, Col, Badge, Alert } from "react-bootstrap";
import { useHeldEvents } from "../hooks/useHeldEvents";
import { shortenAddress } from "../util/string";
import { useAccount } from "wagmi";

export default function Events() {
  const { events, loading, error } = useHeldEvents();
  const { isConnected } = useAccount();

  if (!isConnected) {
    return <></>;
  }

  if (loading) return <div>Loading...</div>;

  if (error) {
    return <div>error occurred</div>;
  }

  if (events.length === 0) {
    return <Alert variant="info">No events found.</Alert>;
  }

  return (
    <>
      <Row>
        {events.map((event) => {
          return (
            <Col sm="12" md="4">
              <a href={`/events/${event.id}`} className="text-decoration-none">
                <Card>
                  <Card.Header>Event: {event.name}</Card.Header>
                  <Card.Body>
                    <ul>
                      <li>Organizer: {shortenAddress(event.organizer)}</li>
                      <li>Name: {event.name}</li>
                      <li>Price per a ticket: {event.price}</li>
                      <li>Max tickets capacity: {event.maxTickets}</li>
                      <li>Tickets sold: {event.ticketsSold}</li>
                      <li>
                        Status:{" "}
                        {event.isActive ? (
                          <Badge bg="success">On going</Badge>
                        ) : (
                          <Badge bg="danger">Closed</Badge>
                        )}
                      </li>
                    </ul>
                  </Card.Body>
                </Card>
              </a>
            </Col>
          );
        })}
      </Row>
    </>
  );
}
