import type { Abi } from "viem";

const ticketMasterAbi = [
  {
    type: "function",
    name: "createEvent",
    inputs: [
      { name: "_name", type: "string", internalType: "string" },
      { name: "_description", type: "string", internalType: "string" },
      { name: "_dateTime", type: "uint256", internalType: "uint256" },
      { name: "_price", type: "uint256", internalType: "uint256" },
      { name: "_maxTickets", type: "uint256", internalType: "uint256" },
    ],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "events",
    inputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    outputs: [
      { name: "id", type: "uint256", internalType: "uint256" },
      {
        name: "organizer",
        type: "address",
        internalType: "address payable",
      },
      { name: "name", type: "string", internalType: "string" },
      { name: "description", type: "string", internalType: "string" },
      { name: "dateTime", type: "uint256", internalType: "uint256" },
      { name: "price", type: "uint256", internalType: "uint256" },
      { name: "maxTickets", type: "uint256", internalType: "uint256" },
      { name: "ticketsSold", type: "uint256", internalType: "uint256" },
      { name: "isActive", type: "bool", internalType: "bool" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "eventsOrganizers",
    inputs: [
      { name: "", type: "address", internalType: "address" },
      { name: "", type: "uint256", internalType: "uint256" },
    ],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getBoughtTickets",
    inputs: [{ name: "buyer", type: "address", internalType: "address" }],
    outputs: [{ name: "", type: "uint256[]", internalType: "uint256[]" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getEvent",
    inputs: [{ name: "id", type: "uint256", internalType: "uint256" }],
    outputs: [
      { name: "", type: "uint256", internalType: "uint256" },
      { name: "", type: "address", internalType: "address" },
      { name: "", type: "string", internalType: "string" },
      { name: "", type: "string", internalType: "string" },
      { name: "", type: "uint256", internalType: "uint256" },
      { name: "", type: "uint256", internalType: "uint256" },
      { name: "", type: "uint256", internalType: "uint256" },
      { name: "", type: "uint256", internalType: "uint256" },
      { name: "", type: "bool", internalType: "bool" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getEventIdsByOrganizer",
    inputs: [{ name: "organizer", type: "address", internalType: "address" }],
    outputs: [{ name: "", type: "uint256[]", internalType: "uint256[]" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getTicket",
    inputs: [{ name: "ticketId", type: "uint256", internalType: "uint256" }],
    outputs: [
      { name: "", type: "uint256", internalType: "uint256" },
      { name: "", type: "address", internalType: "address" },
      { name: "", type: "uint256", internalType: "uint256" },
      { name: "", type: "string", internalType: "string" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "mintTicket",
    inputs: [
      { name: "eventId", type: "uint256", internalType: "uint256" },
      { name: "notes", type: "string", internalType: "string" },
    ],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "ticketToEvent",
    inputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "ticketsDetails",
    inputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    outputs: [
      { name: "id", type: "uint256", internalType: "uint256" },
      { name: "buyer", type: "address", internalType: "address" },
      { name: "eventId", type: "uint256", internalType: "uint256" },
      { name: "notes", type: "string", internalType: "string" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "ticketsOwner",
    inputs: [
      { name: "", type: "address", internalType: "address" },
      { name: "", type: "uint256", internalType: "uint256" },
    ],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
] as Abi;

export const CONTRACT_ADDRESS =
  "0x03C7725245fD116ffFFAc89C5E518FeD28dEe499" as `0x${string}`;

export default ticketMasterAbi;
