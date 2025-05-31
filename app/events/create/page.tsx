"use client";

import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useAccount, useWriteContract } from "wagmi";
import ticketMasterAbi from "./../../abi/TicketMaster";

interface Event {
  name: string;
  description: string;
  dateTime: number;
  price: number;
  maxTickets: number;
}

export default function CreateEvent() {
  const [form, setForm] = useState<Event>({
    name: "",
    description: "",
    dateTime: 0,
    price: 0,
    maxTickets: 0,
  });

  const CONTRACT_ADDRESS = "0x6F2cFd0fE37353230575F5c0e827e986904C2aDb";
  const account = useAccount();
  const { data: hash, isPending, status, writeContract } = useWriteContract();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    console.log(form);
    createEvent(form);
  };

  const createEvent = async (payload: Event) => {
    try {
      const now = Math.floor(new Date(form.dateTime).getTime() / 1000);

      writeContract({
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

      if (!isPending && status === "success") {
        alert("created event successfully");
      }
    } catch (err) {
      console.error(err);
      alert("there are errors occurred");
    }
  };

  return (
    <Form className="p-4 container" onSubmit={(e) => handleSubmit(e)}>
      <h1 className="text-xl font-bold">Create Event</h1>

      <Form.Group controlId="formName" className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control
          name="name"
          onChange={(e) => handleChange(e)}
          placeholder="Event Name"
        />
      </Form.Group>

      <Form.Group controlId="formDescription" className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control
          name="description"
          onChange={(e) => handleChange(e)}
          placeholder="Description"
        />
      </Form.Group>

      <Form.Group controlId="formDateTime" className="mb-3">
        <Form.Label>Datetime</Form.Label>
        <Form.Control
          type="datetime-local"
          name="dateTime"
          onChange={(e) => handleChange(e)}
        />
      </Form.Group>

      <Form.Group controlId="formPrice" className="mb-3">
        <Form.Label>Price</Form.Label>
        <Form.Control
          type="number"
          name="price"
          onChange={(e) => handleChange(e)}
          placeholder="Price"
        />
      </Form.Group>

      <Form.Group controlId="formMaxTickets" className="mb-3">
        <Form.Label>Max tickets</Form.Label>
        <Form.Control
          type="number"
          name="maxTickets"
          onChange={(e) => handleChange(e)}
          placeholder="Max Tickets"
        />
      </Form.Group>

      <Button
        onClick={(e) => handleSubmit(e)}
        type="submit"
        disabled={isPending}
      >
        {isPending ? "Confirming..." : "Create event"}
      </Button>
    </Form>
  );
}
