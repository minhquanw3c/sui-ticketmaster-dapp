"use client";

import { Card, Row, Col, Badge, Alert } from "react-bootstrap";
import { useBoughtTickets } from "../hooks/useBoughtTickets";
import { shortenAddress } from "../util/string";
import { useAccount } from "wagmi";

export default function Tickets() {
	const { tickets, loading, error } = useBoughtTickets();
	const { isConnected } = useAccount();

	if (!isConnected) {
		return <></>;
	}

	if (loading) return <div>Loading...</div>;

	if (error && error.fetchTicketIdsError) {
		return <>{error.fetchTicketIdsError.cause.name}</>;
	}

	if (error && error.fetchTicketsError) {
		return <>{error.fetchTicketsError.cause}</>;
	}

	if (tickets.length === 0) {
		return <Alert variant="info">No tickets found.</Alert>;
	}

	return (
		<>
			<Row>
				<Col xs="12">
					<h3>
						<p>Your purchased tickets</p>
					</h3>
				</Col>

				{tickets.length === 0 && (
					<>
						<Alert role="info">No tickets found.</Alert>
					</>
				)}

				{tickets.map((ticket) => {
					return (
						<Col sm="12" md="4" key={ticket.id}>
							<Card>
								<Card.Header>
									Buyer: {shortenAddress(ticket.buyer)}
								</Card.Header>
								<Card.Body>
									<ul>
										<li>Event Id: {ticket.eventId}</li>
										<li>Notes: {ticket.notes}</li>
									</ul>
								</Card.Body>
							</Card>
						</Col>
					);
				})}
			</Row>
		</>
	);
}
