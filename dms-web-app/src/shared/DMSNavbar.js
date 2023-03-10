import React from "react";
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout, selectIsLoggedIn, selectUserEmail, selectUserRole} from "../redux/user.slice";

function DMSNavbar() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const isLoggedIn = useSelector(selectIsLoggedIn);
	const email = useSelector(selectUserEmail);
	const role = useSelector(selectUserRole);
	return (
		<Navbar bg="dark" variant={"dark"} expand="lg">
			<Container fluid={true}>
				<Navbar.Brand href="#home" onClick={() => navigate("/")}>Drinks Management System</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav"/>
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className={"align-items-center"}>
						{
							!!isLoggedIn && (
								<>
									<Nav.Link onClick={() => navigate("/drinks")}>See Consumption</Nav.Link>
									{
										role.split(":")[0] === "2" && (
											<Nav.Link onClick={() => navigate("/admin")}>Admin</Nav.Link>
										)
									}
								</>
							)
						}
						<Nav.Link onClick={() => navigate(isLoggedIn ? "/drinks/consume" : "/guest")}>
							<Button>Consume Now</Button>
						</Nav.Link>
					</Nav>
					{
						isLoggedIn ? (
							<Nav className={"ms-auto align-items-center"}>
								<Nav.Link href={"#"} className={"text-light"}>{email}</Nav.Link>
								<Nav.Link onClick={() => dispatch(logout())}>Log Out</Nav.Link>
							</Nav>
						) : (
							<Nav className={"ms-auto align-items-center"}>
								<Nav.Link onClick={() => navigate("/auth")}>Log In</Nav.Link>
							</Nav>
						)
					}
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default DMSNavbar;