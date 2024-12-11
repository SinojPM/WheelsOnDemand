import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'


const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4">
            <Container>
                <Row>
                    <Col md={4} className="text-center text-md-left">
                        <h5>About Us</h5>
                        <p>
                            We are a team of passionate developers creating innovative solutions.
                        </p>
                    </Col>
                    <Col md={4} className="text-center">
                        <h5>Quick Links</h5>
                        <ul className="list-unstyled">
                            <li><a href="#" className="text-light">Home</a></li>
                            <li><a href="#" className="text-light">Services</a></li>
                            <li><a href="#" className="text-light">Contact</a></li>
                        </ul>
                    </Col>
                    <Col md={4} className="text-center text-md-right">
                        <h5>Follow Us</h5>
                        <a href="#" className="text-light me-2">Facebook</a>
                        <a href="#" className="text-light">Twitter</a>
                    </Col>
                </Row>
                <Row className="mt-4">
                    <Col className="text-center">
                        <p>&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
                    </Col>
                </Row>
            </Container>
        </footer>
  )
}

export default Footer