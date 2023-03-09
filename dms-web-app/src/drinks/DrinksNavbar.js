import React from "react";
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {logout, selectUserEmail} from "../redux/user.slice";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

function DrinksNavbar() {
	const dispatch = useDispatch();
	const email = useSelector(selectUserEmail);
	const navigate = useNavigate();
	return (
		<Navbar bg="dark" variant={"dark"} expand="lg">
			<Container fluid={true}>
				<Navbar.Brand href="#home" onClick={() => navigate("/")}>Drinks Management System</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav"/>
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className={"align-items-center"}>
						<Nav.Link onClick={() => navigate("/drinks")}>See Consumption</Nav.Link>
						<Nav.Link onClick={() => navigate("/drinks/consume")}>
							<Button>Consume Now</Button>
						</Nav.Link>
					</Nav>
					<Nav className={"ms-auto align-items-center"}>
						<Nav.Link href={"#"} className={"text-light"}>{email}</Nav.Link>
						<Nav.Link onClick={() => dispatch(logout())}>Log Out</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default DrinksNavbar;