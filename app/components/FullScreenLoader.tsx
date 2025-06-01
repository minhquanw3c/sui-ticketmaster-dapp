import { Spinner } from "react-bootstrap";

export default function FullScreenLoader() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
      }}
    >
      <Spinner animation="border" role="status" />
      <span className="ms-2">Processing transaction...</span>
    </div>
  );
}
