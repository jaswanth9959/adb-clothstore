import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
function Footer() {
  return (
    <footer className=" py-4">
      <Container>
        <hr />
        <Row className="text-center justify-content-center">
          <Col md={5}>
            <h5 style={{ color: "#121f16" }}>Quick Links</h5>
            <ul className="list-unstyled" style={{ color: "#121f16" }}>
              <li>
                <Link to="#" style={{ textDecoration: "none", color: "black" }}>
                  Products
                </Link>
              </li>
              <li>
                <Link to="#" style={{ textDecoration: "none", color: "black" }}>
                  About Us
                </Link>
              </li>
            </ul>
          </Col>
          <Col md={5} style={{ color: "#121f16" }}>
            <h5>Contact Us</h5>
            <p>Email: clothstore@email.com</p>
            <p>Phone: +737-989-8989</p>
          </Col>
        </Row>
        <Row>
          <Col className="text-center" style={{ color: "#121f16" }}>
            <p>&copy; {new Date().getFullYear()} Clothingstore</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
