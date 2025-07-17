import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';

const sections = [
    {
        title: "Project Overview",
        icon: "bi-bar-chart-fill text-primary",
        color: "primary",
        content: (
            <p>
                <b>GP-Statz</b> is a bilingual MotoGP dashboard built with <b>React</b> and <b>Recharts</b>. It delivers fast, interactive, and visually engaging statistics for fans, with a crisp interface and seamless English/French support.
            </p>
        ),
    },
    {
        title: "Features",
        icon: "bi-stars text-warning",
        color: "warning",
        content: (
            <ul className="about-list">
                <li><i className="bi bi-graph-up-arrow text-success me-2"></i> Interactive MotoGP charts & stats</li>
                <li><i className="bi bi-translate text-info me-2"></i> Bilingual: English &amp; French</li>
                <li><i className="bi bi-arrow-repeat text-primary me-2"></i> Live data from the official MotoGP API</li>
                <li><i className="bi bi-sliders2-vertical text-warning me-2"></i> Customizable data with filtering</li>
                <li><i className="bi bi-universal-access text-danger me-2"></i> Responsive &amp; accessible UI</li>
            </ul>
        ),
    },
    {
        title: "Technologies",
        icon: "bi-cpu text-info",
        color: "info",
        content: (
            <ul className="about-list">
                <li><i className="bi bi-filetype-jsx me-2 text-primary"></i> React (UI framework)</li>
                <li><i className="bi bi-bar-chart-steps me-2 text-success"></i> Recharts (Data visualization)</li>
                <li><i className="bi bi-bootstrap-fill me-2 text-purple"></i> React-Bootstrap (Layout & styling)</li>
                <li><i className="bi bi-cloud-arrow-down me-2 text-info"></i> Axios (API fetching)</li>
                <li><i className="bi bi-brush me-2 text-warning"></i> SASS (Advanced styling)</li>
            </ul>
        ),
    },
    {
        title: "Course Context",
        icon: "bi-mortarboard-fill text-success",
        color: "success",
        content: (
            <p>
                Developed for <b>SEG3525</b> at the University of Ottawa, GP-Statz demonstrates excellence in interactive data visualization and internationalization as a modern, academic web project.
            </p>
        ),
    },
];

const About = () => (
    <Container className="py-5 px-3 px-md-5">
        <Row className="justify-content-center mb-5">
            <Col md={10} lg={8} className="text-center">
                <img
                    src="https://motogp-cms-images.b-cdn.net/wp-content/uploads/2023/03/GP-Statz-Logo.png"
                    alt="GP-Statz Logo"
                    className="mb-3"
                    style={{
                        width: 120,
                        borderRadius: 20,
                        background: 'var(--bs-card-bg)',
                        boxShadow: '0 2px 16px #2a9fd633',
                    }}
                />
                <h1 className="display-4 fw-bold brand-title mb-1">
                    <i className="bi bi-speedometer2 me-2 text-primary"></i>
                    GP-Statz
                </h1>
                <p className="lead text-secondary">
                    The interactive MotoGP dashboard for fans.<br />
                    <span className="badge rounded-pill bg-primary bg-opacity-10 text-primary fw-normal mt-2">
            SEG3525 - University of Ottawa
          </span>
                </p>
            </Col>
        </Row>

        <Row className="gy-4">
            {sections.map(({ title, icon, color, content }, idx) => (
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

export default About;