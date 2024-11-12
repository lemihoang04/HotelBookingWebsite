import React, { useState } from "react";
import "../Footer/footer.css";
import { Col, Container, Row, ListGroup, NavLink } from "react-bootstrap";
const Footer = () => {
	return (
		<Container>
			<Row>
				<Col md="3" sm="12" className="quick_link mt-3 mt-md-0">
					<h4 className="mt-lg-0 mt-sm-3">Company</h4>
					<ListGroup variant="flush">
						<ListGroup.Item>
							<NavLink to="/">About us</NavLink>
						</ListGroup.Item>
						<ListGroup.Item>
							<NavLink to="/">News</NavLink>
						</ListGroup.Item>
						<ListGroup.Item>
							<NavLink to="/">FaQ</NavLink>
						</ListGroup.Item>
					</ListGroup>
				</Col>
				<Col md="3" sm="12" className="quick_link mt-3 mt-md-0">
					<h4 className="mt-lg-0 mt-sm-3">Explore</h4>
					<ListGroup variant="flush">
						<ListGroup.Item>
							<NavLink to="/">FaQ</NavLink>
						</ListGroup.Item>
						<ListGroup.Item>
							<NavLink to="/">Tour Listings</NavLink>
						</ListGroup.Item>
						<ListGroup.Item>
							<NavLink to="/">Destination</NavLink>
						</ListGroup.Item>
					</ListGroup>
				</Col>
				<Col md="3" sm="12" className="quick_link mt-3 mt-md-0">
					<h4 className="mt-lg-0 mt-sm-3">Quick Link</h4>
					<ListGroup variant="flush">
						<ListGroup.Item>
							<NavLink to="/">Home</NavLink>
						</ListGroup.Item>
						<ListGroup.Item>
							<NavLink to="/">About us</NavLink>
						</ListGroup.Item>
						<ListGroup.Item>
							<NavLink to="/">Contact us</NavLink>
						</ListGroup.Item>
					</ListGroup>
				</Col>
				<Col md="3" sm="12" className="quick_link mt-3 mt-md-0">
					<h4 className="mt-lg-0 mt-sm-3">Contact Info </h4>

					<div className="d-flex align-items-center">
						<p className="pb-2"> An Khe, Thanh Khe, Da Nang</p>
					</div>

					<div className="d-flex align-items-top my-2">
						<i className="bi bi-geo-alt me-3"></i>
						<a
							target="_blank"
							rel="noreferrer"
							href="quangminh23122004@gmai.com"
							className="d-block"
						>
							quangminh23122004@gmai.com
						</a>
					</div>
					<div className="d-flex align-items-top ">
						<i className="bi bi-telephone me-3"></i>
						<a
							target="_blank"
							rel="noreferrer"
							href="tel:0349424514"
							className="d-block"
						>
							0349424514
						</a>
					</div>
				</Col>
			</Row>
		</Container>
	);
};

export default Footer;
