import React from "react";
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

function GuestNavbar() {
	const navigate = useNavigate();
	return (
		<Navbar bg="dark" variant={"dark"} expand="lg">
			<Container fluid={true}>
				<Navbar.Brand href="#home" onClick={() => navigate("/")}>Drinks Management System</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav"/>
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className={"align-items-center"}>
						<Nav.Link onClick={() => navigate("/guest")}>
							<Button>Consume Now</Button>
						</Nav.Link>
					</Nav>
					<Nav className={"ms-auto align-items-center"}>
						<Nav.Link onClick={() => navigate("/auth")}>Log In</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default GuestNavbar;