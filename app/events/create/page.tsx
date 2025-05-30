"use client";

import { notFound } from "next/navigation";
import { useState } from "react";
import { Form } from "react-bootstrap";
import { useAccount } from "wagmi";

interface Event {
  name: string;
  description: string;
  dateTime: string;
  price: number;
  maxTickets: number;
  ticketNames: string;
  ticketURIs: string;
}

export default function CreateEvent() {
  const [form, setForm] = useState<Event>({
    name: "",
    description: "",
    dateTime: "",
    price: 0,
    maxTickets: 0,
    ticketNames: "",
    ticketURIs: "",
  });

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

  return (
    <Form className="p-4" onSubmit={(e) => handleSubmit(e)}>
      <h1 className="text-xl font-bold">Create Event</h1>
      <input
        name="name"
        onChange={(e) => handleChange(e)}
        placeholder="Event Name"
        className="block my-2"
      />
      <textarea
        name="description"
        onChange={(e) => handleChange(e)}
        placeholder="Description"
        className="block my-2"
      />
      <input
        type="datetime-local"
        name="dateTime"
        onChange={(e) => handleChange(e)}
        className="block my-2"
      />
      <input
        name="price"
        onChange={(e) => handleChange(e)}
        placeholder="Price (ETH)"
        className="block my-2"
      />
      <input
        name="maxTickets"
        onChange={(e) => handleChange(e)}
        placeholder="Max Tickets"
        className="block my-2"
      />
      <input
        name="ticketNames"
        onChange={(e) => handleChange(e)}
        placeholder="Ticket Names (comma separated)"
        className="block my-2"
      />
      <input
        name="ticketURIs"
        onChange={(e) => handleChange(e)}
        placeholder="Ticket URIs (comma separated)"
        className="block my-2"
      />
      <button
        onClick={(e) => handleSubmit(e)}
        className="bg-blue-500 text-white px-4 py-2 rounded"
        type="submit"
      >
        Create Event
      </button>
    </Form>
  );
}
