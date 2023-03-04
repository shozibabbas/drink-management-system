import React from "react";
import {Navigate, Outlet} from "react-router-dom";
import {Col, Container, Row} from "react-bootstrap";
import {useSelector} from "react-redux";
import {selectIsLoggedIn} from "../redux/user.slice";

AuthLayout.propTypes = {};

function AuthLayout() {
	const isLoggedIn = useSelector(selectIsLoggedIn);
	if (isLoggedIn) {
		return <Navigate to="/"/>;
	}
	return (
		<Container>
			<Row>
				<Col className={"vh-100 d-flex justify-content-center align-items-center"}>
					<div className={"w-25"}>
						<Outlet/>
					</div>
				</Col>
			</Row>
		</Container>
	);
}

export default AuthLayout;
