import React from "react";
import {Container, Nav, Navbar} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {logout} from "../redux/user.slice";
import PropTypes from "prop-types";

DrinksLayout.propTypes = {
	children: PropTypes.any
};

function DrinksLayout({children}) {
	const dispatch = useDispatch();
	return (
		<>
			<Navbar bg="dark" variant={"dark"} expand="lg">
				<Container>
					<Navbar.Brand href="#home">Drinks Management System</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav"/>
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className={"ms-auto"}>
							<Nav.Link onClick={() => dispatch(logout())}>Log Out</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
			{children}
		</>
	);
}

export default DrinksLayout;