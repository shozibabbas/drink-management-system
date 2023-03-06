import React from "react";
import {Col, Container, Row, Spinner, Table} from "react-bootstrap";
import {useGetUserDrinksQuery} from "../redux/drinks.api";

function DrinksListing() {
	const {data, isLoading, error} = useGetUserDrinksQuery();

	if (isLoading) {
		return (
			<div>
				<Spinner animation={"border"}/>
			</div>
		);
	}
	if (error) {
		return (
			<div>
				{JSON.stringify(error, null, 2)}
			</div>
		);
	}
	return (
		<Container fluid={true}>
			<Row>
				<Col>
					<Table striped bordered hover>
						<thead>
							<tr>
								<td>#</td>
								<td>Name</td>
								<td>Date</td>
							</tr>
						</thead>
						<tbody>
							{
								data.map(d => {
									const date = new Date(d.createTime);

									return (
										<tr key={d.i}>
											<td>{d.i}</td>
											<td>{d.name}</td>
											<td>{date.toDateString()} {date.toLocaleTimeString()}</td>
										</tr>
									);
								})
							}
						</tbody>
					</Table>
				</Col>
				<Col>

				</Col>
			</Row>
		</Container>
	);
}

export default DrinksListing;