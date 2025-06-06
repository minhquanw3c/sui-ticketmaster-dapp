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

export type ToastProps = {
	isEnabled: boolean;
	variant: string;
	message: {
		success: string;
		failed: string;
	};
	onCloseToast: () => void;
};
