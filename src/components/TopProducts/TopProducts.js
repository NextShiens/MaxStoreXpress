import React from 'react';
import { Container, Row, Col, ProgressBar } from 'react-bootstrap';
import './TopProducts.css';

const TopProducts = () => {
  const getCurrentDateTime = () => {
    const now = new Date();
    return `${now.toDateString()} ${now.toLocaleTimeString()}`;
  };

  return (
    <div className="TopProducts">
      <header className="d-flex justify-content-between align-items-center bg-dark p-3">
        <div className="text-light">Top Products</div>
        <div className="text-light">{getCurrentDateTime()}</div>
      </header>

      <Container className="mt-4">
        <Row>
          <Col>
            <h2 className="mb-4">Top Sales by Categories</h2>
            <ProgressBar className="mb-3" variant="success" label="Electronics" now={60} />
            <ProgressBar className="mb-3" variant="info" label="Fashion" now={40} />
            <ProgressBar className="mb-3" variant="warning" label="Food & Drinks" now={30} />
            <ProgressBar variant="danger" label="Services" now={20} />
          </Col>
        </Row>
      </Container>

      <Container className="mt-4">
        <Row>
          <Col md={6}>
            <h3 className="mb-3">Electronics</h3>
            <img src="electronics-image.jpg" alt="Electronics" className="category-image" />
          </Col>

          <Col md={6}>
            <h3 className="mb-3">Fashion</h3>
            <img src="fashion-image.jpg" alt="Fashion" className="category-image" />
          </Col>
        </Row>

        <Row className="mt-4">
          <Col md={6}>
            <h3 className="mb-3">Food & Drinks</h3>
            <img src="groceries-image.jpg" alt="Food & Drinks" className="category-image" />
          </Col>

          <Col md={6}>
            <h3 className="mb-3">Services</h3>
            <img src="services-image.jpg" alt="Services" className="category-image" />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default TopProducts;
