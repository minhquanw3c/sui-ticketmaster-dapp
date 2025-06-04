"use client";

import { Card, Row, Col, Badge, Alert } from "react-bootstrap";
import { shortenAddress } from "../util/string";
import { useAccount } from "wagmi";
import { useBrowseEvents } from "../hooks/useBrowseEvents";

export default function Events() {
  const { events, loading, error } = useBrowseEvents();
  const { isConnected } = useAccount();

  if (!isConnected) {
    return <></>;
  }

  if (loading) return <div>Loading...</div>;

  if (error && error.fetchEventsError) {
    return <>{error.fetchEventsError.cause.name}</>;
  }

  if (events.length === 0) {
    return <Alert variant="info">No events found.</Alert>;
  }

  return (
    <>
      <Row>
        <Col xs="12">
          <h3>
            <p>Members public event</p>
          </h3>
        </Col>

        {events.map((event) => {
          return (
            <Col sm="12" md="4" key={event.id} className="px-0">
              <a
                href={`/events/${event.id}`}
                className="text-decoration-none d-block mx-3 my-3"
              >
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
