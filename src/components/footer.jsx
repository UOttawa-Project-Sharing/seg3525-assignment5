import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import translations from '../data/lang.jsx';

const Footer = () => {
  const language = useSelector((state) => state.language.value);

  return (
    <footer className="footer bg-dark text-light py-3 mt-auto">
      <Container>
        <Row>
          <Col className="text-center">
            <span>© {new Date().getFullYear()} Tristan Robichaud. {translations[language].footer.text}</span>
            <br />
            <span>{translations[language].footer.description}</span>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
