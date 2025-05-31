export type ParsedEvent = {
  id: number;
  organizer: string;
  name: string;
  description: string;
  dateTime: number;
  price: number;
  maxTickets: number;
  ticketsSold: number;
  isActive: boolean;
};
