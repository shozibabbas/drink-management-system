import React from "react";
import {Navigate, Outlet} from "react-router-dom";
import {Col, Container, Row} from "react-bootstrap";
import {useSelector} from "react-redux";
import {selectIsLoggedIn} from "../redux/user.slice";
import GuestNavbar from "../guest/GuestNavbar";

AuthLayout.propTypes = {};

function AuthLayout() {
	const isLoggedIn = useSelector(selectIsLoggedIn);
	if (isLoggedIn) {
		return <Navigate to="/"/>;
	}
	return (
		<div className={"min-vh-100 d-flex flex-column"}>
			<GuestNavbar/>
			<Container className={"flex-grow-1 d-flex flex-column"} fluid={true}>
				<Row className={"flex-grow-1"}>
					<Col sm={{offset: 2, span: 8}} md={{offset: 3, span: 6}}
						className={"d-flex flex-column justify-content-center align-items-center"}>
						<Outlet/>
					</Col>
				</Row>
			</Container>
		</div>
	);
}

export default AuthLayout;
