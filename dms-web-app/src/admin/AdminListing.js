import React, {useState} from "react";
import {
	useDeleteUserDrinkMutation,
	useGetAllUserDrinksQuery,
	useGetDrinkingUsersQuery,
	useGetDrinksQuery,
	useRetrieveUserDrinkMutation
} from "../redux/drinks.api";
import {Button, Col, Container, Form, FormControl, InputGroup, Row, Spinner, Table} from "react-bootstrap";
import {MONTHS} from "../shared/Constants";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faReply, faTrash} from "@fortawesome/free-solid-svg-icons";

function AdminListing() {
	const [year, setYear] = useState((new Date()).getFullYear());
	const [month, setMonth] = useState((new Date()).getMonth() + 1);
	const [day, setDay] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [drinkId, setDrinkId] = useState(0);
	const [userId, setUserId] = useState(0);
	const {data, isLoading, error} = useGetAllUserDrinksQuery({year, month, userId});
	const {data: drinks, isLoading: drinksLoading, error: drinksError} = useGetDrinksQuery();
	const {
		data: drinkingUsers,
		isLoading: drinkingUsersIsLoading,
		error: drinkingUsersError
	} = useGetDrinkingUsersQuery({year, month});
	const {count, rows} = data || {};
	const [deleteUserDrink] = useDeleteUserDrinkMutation();
	const [retrieveUserDrink] = useRetrieveUserDrinkMutation();

	if (isLoading || drinkingUsersIsLoading || drinksLoading) {
		return (
			<div className={"text-center m-3"}>
				<Spinner animation={"border"}/>
			</div>
		);
	}
	if (error || drinkingUsersError || drinksError) {
		return (
			<div>
				{JSON.stringify(error || drinkingUsersError || drinksError, null, 2)}
			</div>
		);
	}

	let filteredData = day !== 0 ? rows.filter(d => (new Date(d.createTime)).getDate() === day) : rows;
	filteredData = drinkId !== 0 ? filteredData.filter(d => d.drinkId === drinkId) : filteredData;
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
								<Form.Label>Name</Form.Label>
								<Form.Select name={"userId"} value={userId}
									onChange={(e) => setUserId(parseInt(e.target.value))}>
									<option value={0}>Show All</option>
									{
										drinkingUsers.map(user => (
											<option key={user.id} value={user.id}>{user.name}</option>
										))
									}
								</Form.Select>
							</Form.Group>
						</Col>
						<Col>
							<Form.Group className="mb-3">
								<Form.Label>Year</Form.Label>
								<Form.Select name={"year"} value={year}
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
								<Form.Select name={"month"} value={month}
									onChange={(e) => setMonth(parseInt(e.target.value))}>
									{
										MONTHS.map(m => (
											<option key={m.id} value={m.id}>{m.name}</option>
										))
									}
								</Form.Select>
							</Form.Group>
						</Col>
						<Col className={"border-start"}>
							<Form.Group className="mb-3">
								<Form.Label>Day</Form.Label>
								<Form.Select name={"year"} value={day}
									onChange={(e) => setDay(parseInt(e.target.value))}>
									<option value={0}>Show All</option>
									{
										[...Array(31).keys()].map(i => (
											<option key={i} value={i + 1}>{i + 1}</option>
										))
									}
								</Form.Select>
							</Form.Group>
						</Col>
						<Col>
							<Form.Group className="mb-3">
								<Form.Label>Drinks</Form.Label>
								<Form.Select name={"drinkId"} value={drinkId}
									onChange={(e) => setDrinkId(parseInt(e.target.value))}>
									<option value={0}>Show All</option>
									{
										drinks.map(drink => (
											<option key={drink.id} value={drink.id}>{drink.name}</option>
										))
									}
								</Form.Select>
							</Form.Group>
						</Col>
					</Row>
					{
						count > 0 && (
							<Row className={"mb-2"}>
								<Col md={day || drinkId ? 3 : 2}
									className={"d-flex justify-content-start align-items-center"}>
									<InputGroup>
										{
											(day || drinkId && filteredData.length !== count) ? (
												<>
													<FormControl
														type={"text"}
														readOnly
														value={filteredData.length}
													/>
													<InputGroup.Text>out of</InputGroup.Text>
												</>
											) : ""
										}
										<FormControl
											type={"text"}
											readOnly
											value={count}
										/>
										<InputGroup.Text>Total Cup(s)</InputGroup.Text>
									</InputGroup>
								</Col>
								<Col md={day || drinkId ? 7 : 8}
									className={"d-flex justify-content-center align-items-center"}>
                                    Showing 1 to 10 of 20 record(s)
								</Col>
								<Col md={2}>
									<InputGroup>
										<InputGroup.Text>Rows per page</InputGroup.Text>
										<Form.Select name={"rowsPerPage"} value={rowsPerPage}
											onChange={(e) => setRowsPerPage(parseInt(e.target.value))}>
											<option value="10">10</option>
											<option value="25">25</option>
											<option value="50">50</option>
										</Form.Select>
									</InputGroup>
								</Col>
							</Row>
						)
					}
				</Col>
			</Row>
			<Row>
				<Col>
					<Table className={"admin-table"} hover bordered>
						<thead>
							<tr>
								<th className={"serial"}>#</th>
								<th className={"date"}>Date</th>
								<th className={"drink"}>Drink Name</th>
								<th className={"employee-name"}>Employee Name</th>
								<th className={"employee-email"}>Employee Email</th>
								<th className={"actions"}>Actions</th>
							</tr>
						</thead>
						<tbody>
							{
								filteredData.length < 1 && (
									<tr>
										<td colSpan={6} className={"text-center"}>No records found</td>
									</tr>
								)
							}
							{
								filteredData.map(d => {
									const date = new Date(d.createTime);

									return (
										<tr key={d.i} className={`${d.isDeleted ? "opacity-50" : ""}`}>
											<td>{d.i}</td>
											<td>{date.toDateString()} {date.toLocaleTimeString()}</td>
											<td>{d.drinkName}</td>
											<td>{d.userName}</td>
											<td>{d.userEmail}</td>
											<td>
												{
													d.isDeleted ? (
														<Button variant={"outline-success"} size={"sm"}
															onClick={() => retrieveUserDrink({
																id: d.id
															})}>
															<FontAwesomeIcon icon={faReply}/> Retrieve
														</Button>
													) : (
														<Button variant={"outline-danger"} size={"sm"}
															onClick={() => deleteUserDrink({
																id: d.id
															})}>
															<FontAwesomeIcon icon={faTrash}/> Delete
														</Button>
													)
												}
											</td>
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

export default AdminListing;