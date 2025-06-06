import { Toast, ToastContainer } from "react-bootstrap";
import { SHOW_TOAST_DURATION_SECONDS } from "../config/timer";
import { ToastProps } from "../types/ParsedEvent";

export default function ToastNotification({
	isEnabled,
	variant,
	message,
	onCloseToast,
}: ToastProps) {
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
							variant === "success" ? "bg-success" : "bg-danger"
						}`}
					>
						Notice
					</Toast.Header>
					<Toast.Body>
						{variant === "success"
							? message.success
							: message.failed}
					</Toast.Body>
				</Toast>
			</ToastContainer>
		</>
	);
}
