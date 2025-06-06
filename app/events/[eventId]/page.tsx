"use client";

import { useParams } from "next/navigation";
import { useReadContract, useWriteContract } from "wagmi";
import ticketMasterAbi from "@/app/abi/TicketMaster";
import { CONTRACT_ADDRESS } from "@/app/abi/TicketMaster";
import { useEffect, useState } from "react";
import { ParsedEvent } from "@/app/types/ParsedEvent";
import { parseEther } from "ethers";
import { useAccount, usePublicClient } from "wagmi";
import { Card, Badge, Form, Toast, ToastContainer } from "react-bootstrap";
import { shortenAddress } from "@/app/util/string";
import FullScreenLoader from "@/app/components/FullScreenLoader";
import {
	RELOAD_CURRENT_PAGE_AFTER_SECONDS,
	SHOW_TOAST_DURATION_SECONDS,
} from "@/app/config/timer";
import ToastNotification from "@/app/components/ToastNotification";

export default function EventDetails() {
	const { eventId } = useParams();
	const [eventDetails, setEventDetails] = useState<ParsedEvent | undefined>(
		undefined
	);

	const [showLoading, setShowLoading] = useState<boolean>(false);
	const [showToast, setShowToast] = useState<boolean>(false);
	const [toastVariant, setToastVariant] = useState<string>("");

	const [ticketNotes, setTicketNotes] = useState<string>("");
	const publicClient = usePublicClient();

	const { data: hash, isPending, writeContractAsync } = useWriteContract();
	const { address, isConnected } = useAccount();

	const {
		data: eventData,
		isPending: isLoadingEvent,
		error: errorOnFetch,
	} = useReadContract({
		address: CONTRACT_ADDRESS,
		abi: ticketMasterAbi,
		functionName: "getEvent",
		args: [BigInt(eventId as string)],
		query: {
			enabled: !!address && isConnected,
		},
	});

	const mint = async (): Promise<boolean> => {
		try {
			const txHash = await writeContractAsync({
				address: CONTRACT_ADDRESS,
				abi: ticketMasterAbi,
				functionName: "mintTicket",
				args: [eventId, ticketNotes],
				value: parseEther(eventDetails!.price.toString()),
			});

			const receipt = await publicClient?.waitForTransactionReceipt({
				hash: txHash,
			});

			return Promise.resolve(true);
		} catch (err) {
			console.error(err);
			return Promise.reject(false);
		}
	};

	const onBuyTicket = async () => {
		try {
			setShowLoading(true);

			const hasPurchasedTicket = await mint();

			setToastVariant(hasPurchasedTicket ? "success" : "danger");
		} catch (err) {
			console.error(err);
			setToastVariant("danger");
		} finally {
			setShowLoading(false);
			setShowToast(true);

			setTimeout(() => {
				window.location.reload();
			}, RELOAD_CURRENT_PAGE_AFTER_SECONDS);
		}
	};

	useEffect(() => {
		if (eventData) {
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
			] = eventData as any[];

			setEventDetails({
				id: Number(id),
				organizer,
				name,
				description,
				dateTime: Number(dateTime),
				price: Number(price),
				maxTickets: Number(maxTickets),
				ticketsSold: Number(ticketsSold),
				isActive,
			});
		}
	}, [eventData]);

	if (isLoadingEvent) {
		return <>Loading...</>;
	}

	if (errorOnFetch || !eventDetails) {
		console.log(errorOnFetch);
		return <>Error</>;
	}

	return (
		<>
			{showLoading && <FullScreenLoader />}
			{showToast && (
				<ToastNotification
					isEnabled={showToast}
					variant={toastVariant}
					onCloseToast={() => {
						setShowToast(false);
						setToastVariant("");
					}}
				/>
			)}

			<h3>
				<p>Buy event ticket</p>
			</h3>

			<Card>
				<Card.Header>Buy a ticket</Card.Header>
				<Card.Body>
					<ul>
						<li>Event: {eventDetails.name}</li>
						<li>
							Organizer: {shortenAddress(eventDetails.organizer)}
						</li>
						<li>Name: {eventDetails.name}</li>
						<li>Price per a ticket: {eventDetails.price}</li>
						<li>Max tickets capacity: {eventDetails.maxTickets}</li>
						<li>Tickets sold: {eventDetails.ticketsSold}</li>
						<li>
							Status:{" "}
							{eventDetails.isActive ? (
								<Badge bg="success">On going</Badge>
							) : (
								<Badge bg="danger">Closed</Badge>
							)}
						</li>
					</ul>

					<Form.Group controlId="formTicketNotes" className="mb-3">
						<Form.Label>Ticket Notes</Form.Label>
						<Form.Control
							name="ticketNotes"
							onChange={(e) => {
								setTicketNotes(e.target.value);
							}}
							placeholder="Your notes here..."
							value={ticketNotes}
						/>
					</Form.Group>
				</Card.Body>
				<Card.Footer className="d-flex justify-content-end">
					{eventDetails.isActive ? (
						<>
							<button
								className="btn btn-primary px-5"
								onClick={onBuyTicket}
								disabled={isPending}
							>
								{isPending ? "Minting" : "Buy"}
							</button>
						</>
					) : null}
				</Card.Footer>
			</Card>
		</>
	);
}
