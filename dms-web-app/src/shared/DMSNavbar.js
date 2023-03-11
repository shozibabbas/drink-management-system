import React from "react";
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout, selectIsAdmin, selectIsLoggedIn, selectUserDetails} from "../redux/user.slice";

function DMSNavbar() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const isLoggedIn = useSelector(selectIsLoggedIn);
	const {name} = useSelector(selectUserDetails);
	const isAdmin = useSelector(selectIsAdmin);
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
										isAdmin && (
											<Nav.Link onClick={() => navigate("/admin")}>See All Entries</Nav.Link>
										)
									}
								</>
							)
						}
						<Nav.Link onClick={() => navigate(isLoggedIn ? "/drinks/consume" : "/guest")}>
							<Button>Consume Now</Button>
						</Nav.Link>
						{
							!!isLoggedIn && !!isAdmin && (
								<Nav.Link onClick={() => navigate("/admin/add")}>
									<Button>Add Bulk</Button>
								</Nav.Link>
							)
						}
					</Nav>
					{
						isLoggedIn ? (
							<Nav className={"ms-auto align-items-center"}>
								<Nav.Link href={"#"} className={"text-light"}>{name}</Nav.Link>
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