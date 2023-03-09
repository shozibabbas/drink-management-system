import React from "react";
import {Outlet} from "react-router-dom";
import {Col, Container, Row} from "react-bootstrap";
import AdminNavbar from "./AdminNavbar";

AdminLayout.propTypes = {};

function AdminLayout() {
	return (
		<div className={"min-vh-100 d-flex flex-column"}>
			<AdminNavbar/>
			<Container className={"flex-grow-1 d-flex flex-column"} fluid={true}>
				<Row>
					<Col
						className={"d-flex flex-column justify-content-center align-items-center"}>
						<Outlet/>
					</Col>
				</Row>
			</Container>
		</div>
	);
}

export default AdminLayout;
