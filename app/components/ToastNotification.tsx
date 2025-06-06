import { Toast, ToastContainer } from "react-bootstrap";
import { SHOW_TOAST_DURATION_SECONDS } from "../config/timer";

export default function ToastNotification({
	isEnabled,
	variant,
	onCloseToast,
}: {
	isEnabled: boolean;
	variant: string;
	onCloseToast: () => void;
}) {
	return (
		<>
			<ToastContainer position={"top-end"} className="p-3">
				<Toast
					onClose={onCloseToast}
					show={isEnabled}
					delay={SHOW_TOAST_DURATION_SECONDS}
					autohide
				>
					<Toast.Header
						className={`text-white justify-content-between ${
							variant === "success"
								? "bg-success"
								: "bg-danger"
						}`}
					>
						Notice
					</Toast.Header>
					<Toast.Body>
						{variant === "success"
							? "Ticket purchased"
							: "Error occurred"}
					</Toast.Body>
				</Toast>
			</ToastContainer>
		</>
	);
}
