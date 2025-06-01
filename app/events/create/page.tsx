"use client";

import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useAccount, useWriteContract } from "wagmi";
import ticketMasterAbi from "@/app/abi/TicketMaster";
import { CONTRACT_ADDRESS } from "@/app/abi/TicketMaster";
import FullScreenLoader from "@/app/components/FullScreenLoader";

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

  const { isConnected } = useAccount();

  const { data: hash, isPending, status, writeContract } = useWriteContract();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    const formInputs = e.currentTarget;
    if (formInputs.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      setValidatedForm(true);
      return;
    }

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
    } catch (err) {
      console.error(err);
    }
  };

  if (!isConnected) {
    return <></>;
  }

  return (
    <>
      {isPending && <FullScreenLoader />}
      <Form
        className="p-4 container"
        onSubmit={(e) => handleSubmit(e)}
        noValidate
        validated={validatedForm}
        method="POST"
      >
        <h1 className="text-xl font-bold">Create Event</h1>

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

        <Form.Group controlId="formDescription" className="mb-3">
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
      </Form>
    </>
  );
}
