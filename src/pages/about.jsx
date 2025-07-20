import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import 'bootstrap-icons/font/bootstrap-icons.css';
import translations from '../data/lang';

const About = () => {
    const language = useSelector((state) => state.language.value);

    return (
        <Container className="py-5 px-3 px-md-5">
            <Row className="justify-content-center mb-5 mt-4">
                <Col md={10} lg={8} className="text-center">
                    <h1 className="display-4 fw-bold brand-title mb-1">
                        <i className="bi bi-speedometer2 me-2 text-primary"></i>
                        GP-Statz
                    </h1>
                    <p className="lead text-secondary">
                        {translations[language].about.shortDesc}<br />
                        <span className="badge rounded-pill bg-primary bg-opacity-10 text-primary fw-normal mt-2">
                            {translations[language].about.tagLine}
                        </span>
                    </p>
                </Col>
            </Row>

            <Row className="gy-4">
                {translations[language].about.sections.map(({ title, icon, color, content }, idx) => (
                    <Col md={6} key={title}>
                        <Card className="about-section h-100 border-0 shadow-sm">
                            <Card.Body>
                                <div className="d-flex align-items-center mb-2">
                                    <i className={`bi ${icon} about-section-icon me-2`} style={{ fontSize: '1.5rem' }}></i>
                                    <span className={`fw-bold text-${color}`} style={{ fontSize: '1.1rem', letterSpacing: '.02em' }}>
                                        {title}
                                    </span>
                                </div>
                                <div>{content}</div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            <style>{`
      .brand-title {
        background: linear-gradient(90deg,var(--bs-primary),var(--bs-info) 80%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
      .about-section {
        background: var(--bs-card-bg, #282828);
        border-radius: 18px;
        transition: box-shadow 0.21s;
      }
      .about-section:hover {
        box-shadow: 0 8px 32px #2a9fd633;
      }
      .about-section-icon {
        text-shadow: 0 2px 8px #2a9fd622;
      }
      .about-list {
        padding-left: 0;
        list-style: none;
        margin-bottom: 0;
        font-size: 1.04rem;
      }
      .about-list li {
        margin-bottom: .45rem;
        display: flex;
        align-items: center;
        gap: .7em;
      }
      @media (max-width: 767px) {
        .about-section { margin-bottom: 1.2rem; }
      }
    `}</style>
    </Container>
    );
};

export default About;
