import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../styles.scss';

const Footer = () => (
  <footer className="footer bg-dark text-light py-3 mt-auto">
    <Container>
      <Row>
        <Col className="text-center">
          <span>© {new Date().getFullYear()} Tristan Robichaud</span>
          <br />
          <span>Data sourced from the official MotoGP API</span>
        </Col>
      </Row>
    </Container>
  </footer>
);

export default Footer;
