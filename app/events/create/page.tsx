"use client";

import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useAccount, useWriteContract } from "wagmi";
import ticketMasterAbi from "./../../abi/TicketMaster";

interface Event {
  name: string;
  description: string;
  dateTime: string;
  price: number;
  maxTickets: number;
}

export default function CreateEvent() {
  const [form, setForm] = useState<Event>({
    name: "",
    description: "",
    dateTime: "",
    price: 0,
    maxTickets: 0,
  });

  const account = useAccount();
  const { data: hash, isPending, writeContract } = useWriteContract();

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
  };

  const createEvent = async (payload: Event) => {
    try {
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

      <Button onClick={(e) => handleSubmit(e)} type="submit">
        Create Event
      </Button>
    </Form>
  );
}
