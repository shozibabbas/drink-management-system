import React, {useState} from "react";
import {Col, Container, Form, Row, Spinner, Table} from "react-bootstrap";
import {useGetUserDrinksQuery} from "../redux/drinks.api";
import {MONTHS} from "../shared/Constants";

function DrinksListing() {
	const [year, setYear] = useState((new Date()).getFullYear());
	const [month, setMonth] = useState((new Date()).getMonth() + 1);
	const [day, setDay] = useState(0);
	const {data, isLoading, error} = useGetUserDrinksQuery({year, month});

	if (isLoading) {
		return (
			<div className={"text-center"}>
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

	const filteredData = day !== 0 ? data.filter(d => (new Date(d.createTime)).getDate() === day) : data;
	return (
		<Container fluid={true}>
			{/*<Row>*/}
			{/*	<Col>*/}
			{/*		<ResponsiveContainer width={"100%"} height={300}>*/}
			{/*			<LineChart width={500} height={100} data={chartData}>*/}
			{/*				<Line type="monotone" dataKey="i" stroke="#8884d8"/>*/}
			{/*				<CartesianGrid stroke="#ccc"/>*/}
			{/*				<XAxis dataKey="createTime"/>*/}
			{/*				<YAxis dataKey={"i"}/>*/}
			{/*				<Tooltip/>*/}
			{/*			</LineChart>*/}
			{/*		</ResponsiveContainer>*/}
			{/*	</Col>*/}
			{/*</Row>*/}
			<Row>
				<Col>
					<Row className={"mt-3"}>
						<Col>
							<Form.Group className="mb-3">
								<Form.Label>Year</Form.Label>
								<Form.Select name={"year"} value={year} size={"sm"}
									onChange={(e) => setYear(parseInt(e.target.value))}>
									<option value={2023}>2023</option>
									<option value={2024}>2024</option>
									<option value={2025}>2025</option>
								</Form.Select>
							</Form.Group>
						</Col>
						<Col>
							<Form.Group className="mb-3">
								<Form.Label>Month</Form.Label>
								<Form.Select name={"month"} value={month} size={"sm"}
									onChange={(e) => setMonth(parseInt(e.target.value))}>
									{
										MONTHS.map(m => (
											<option key={m.id} value={m.id}>{m.name}</option>
										))
									}
								</Form.Select>
							</Form.Group>
						</Col>
						<Col>
							<Form.Group className="mb-3">
								<Form.Label>Day</Form.Label>
								<Form.Select name={"year"} value={day}
									onChange={(e) => setDay(parseInt(e.target.value))} size={"sm"}>
									<option value={0}>Show All</option>
									{
										[...Array(31).keys()].map(i => (
											<option key={i} value={i + 1}>{i + 1}</option>
										))
									}
								</Form.Select>
							</Form.Group>
						</Col>
					</Row>
					{
						filteredData.length > 0 && (
							<Row>
								<Col className={"mb-2"}>
                                    Total Cups: {filteredData.length}
								</Col>
							</Row>
						)
					}

				</Col>
			</Row>
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
								filteredData.length < 1 && (
									<tr>
										<td colSpan={3} className={"text-center"}>No records found</td>
									</tr>
								)
							}
							{
								filteredData.map(d => {
									const date = new Date(d.createTime);

									return (
										<tr key={d.i}>
											<td>{d.i}</td>
											<td>{d.name}</td>
											<td>{date.toLocaleDateString()} {date.toLocaleTimeString()}</td>
										</tr>
									);
								})
							}
						</tbody>
					</Table>
				</Col>
			</Row>
		</Container>
	);
}

export default DrinksListing;