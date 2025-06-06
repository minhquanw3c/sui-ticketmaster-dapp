"use client";

import { useRef, useState } from "react";
import { Button, Card, Form, Toast, ToastContainer } from "react-bootstrap";
import { useAccount, usePublicClient, useWriteContract } from "wagmi";
import ticketMasterAbi from "@/app/abi/TicketMaster";
import { CONTRACT_ADDRESS } from "@/app/abi/TicketMaster";
import FullScreenLoader from "@/app/components/FullScreenLoader";
import {
	RELOAD_CURRENT_PAGE_AFTER_SECONDS,
	SHOW_TOAST_DURATION_SECONDS,
} from "@/app/config/timer";

interface Event {
	name: string;
	description: string;
	dateTime: string;
	price: number;
	maxTickets: number;
}

const intialState: Event = {
	name: "",
	description: "",
	dateTime: "",
	price: 0,
	maxTickets: 0,
};

export default function CreateEvent() {
	const [form, setForm] = useState<Event>({ ...intialState });
	const [validatedForm, setValidatedForm] = useState<boolean | undefined>(
		false
	);
	const [showLoading, setShowLoading] = useState<boolean>(false);
	const [showToast, setShowToast] = useState<boolean>(false);
	const [toastVariant, setToastVariant] = useState<string>("");

	const formContainer = useRef<HTMLFormElement | null>(null);

	const { isConnected } = useAccount();

	const {
		data: hash,
		isPending,
		isSuccess,
		writeContract,
		writeContractAsync,
	} = useWriteContract();

	const publicClient = usePublicClient();

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (
		e:
			| React.FormEvent<HTMLFormElement>
			| React.MouseEvent<HTMLButtonElement>
	) => {
		try {
			e.preventDefault();
			e.stopPropagation();
			setShowLoading(true);

			const formInputs = formContainer.current;

			if (formInputs && formInputs.checkValidity() === false) {
				setValidatedForm(true);
				setShowLoading(false);
				return;
			}

			const hasCreatedEvent = await createEvent(form);

			setToastVariant(hasCreatedEvent ? "success" : "danger");
			setForm({ ...intialState });
		} catch (err) {
			setToastVariant("danger");
		} finally {
			setShowLoading(false);
			setValidatedForm(false);
			setShowToast(true);

			setTimeout(() => {
				window.location.reload();
			}, RELOAD_CURRENT_PAGE_AFTER_SECONDS);
		}
	};

	const createEvent = async (payload: Event): Promise<boolean> => {
		try {
			const now = Math.floor(new Date(form.dateTime).getTime() / 1000);

			const txHash = await writeContractAsync({
				address: CONTRACT_ADDRESS,
				abi: ticketMasterAbi,
				functionName: "createEvent",
				args: [
					payload.name,
					payload.description,
					now,
					payload.price,
					payload.maxTickets,
				],
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

	if (!isConnected) {
		return <></>;
	}

	return (
		<>
			{showLoading && <FullScreenLoader />}
			{showToast && (
				<ToastContainer position={"top-end"} className="p-3">
					<Toast
						onClose={() => {
							setShowToast(false);
							setToastVariant("");
						}}
						show={showToast}
						delay={SHOW_TOAST_DURATION_SECONDS}
						autohide
					>
						<Toast.Header
							className={`text-white justify-content-between ${
								toastVariant === "success"
									? "bg-success"
									: "bg-danger"
							}`}
						>
							Notice
						</Toast.Header>
						<Toast.Body>
							{toastVariant === "success"
								? "Event created"
								: "Error occurred"}
						</Toast.Body>
					</Toast>
				</ToastContainer>
			)}

			<h3>
				<p>Create new event</p>
			</h3>

			<Form
				className="container px-0"
				onSubmit={(e) => handleSubmit(e)}
				noValidate
				validated={validatedForm}
				ref={formContainer}
			>
				<Card>
					<Card.Header>Create new event</Card.Header>
					<Card.Body>
						<Form.Group controlId="formName" className="mb-3">
							<Form.Label>Name</Form.Label>
							<Form.Control
								required
								name="name"
								onChange={(e) => handleChange(e)}
								placeholder="Event Name"
								value={form.name}
							/>
							<Form.Control.Feedback type="invalid">
								Name is required
							</Form.Control.Feedback>
						</Form.Group>

						<Form.Group
							controlId="formDescription"
							className="mb-3"
						>
							<Form.Label>Description</Form.Label>
							<Form.Control
								required
								name="description"
								onChange={(e) => handleChange(e)}
								placeholder="Description"
								value={form.description}
							/>
							<Form.Control.Feedback type="invalid">
								Description is required
							</Form.Control.Feedback>
						</Form.Group>

						<Form.Group controlId="formDateTime" className="mb-3">
							<Form.Label>Datetime</Form.Label>
							<Form.Control
								required
								type="datetime-local"
								name="dateTime"
								onChange={(e) => handleChange(e)}
								value={form.dateTime}
							/>
							<Form.Control.Feedback type="invalid">
								Datetime is required
							</Form.Control.Feedback>
						</Form.Group>

						<Form.Group controlId="formPrice" className="mb-3">
							<Form.Label>Price</Form.Label>
							<Form.Control
								required
								type="number"
								name="price"
								onChange={(e) => handleChange(e)}
								placeholder="Price"
								min={0}
								value={form.price}
							/>
							<Form.Control.Feedback type="invalid">
								Price is required
							</Form.Control.Feedback>
						</Form.Group>

						<Form.Group controlId="formMaxTickets" className="mb-3">
							<Form.Label>Max tickets</Form.Label>
							<Form.Control
								required
								type="number"
								name="maxTickets"
								onChange={(e) => handleChange(e)}
								placeholder="Max Tickets"
								min={1}
								value={form.maxTickets}
							/>
							<Form.Control.Feedback type="invalid">
								Max tickets is required
							</Form.Control.Feedback>
						</Form.Group>

						<div className="d-flex justify-content-end mt-4">
							<Button
								onClick={(e) => handleSubmit(e)}
								type="submit"
								disabled={isPending}
								className="px-4"
							>
								{isPending ? "Confirming..." : "Create event"}
							</Button>
						</div>
					</Card.Body>
				</Card>
			</Form>
		</>
	);
}
