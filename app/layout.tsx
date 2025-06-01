import "bootstrap/dist/css/bootstrap.min.css";
import Providers from "./components/Provider";
import Header from "./components/Header";
import { Col, Container, Row } from "react-bootstrap";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Header />
          <Container className="mt-5">{children}</Container>
        </Providers>
      </body>
    </html>
  );
}
