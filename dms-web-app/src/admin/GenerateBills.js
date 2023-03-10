import "./generate-bills.scss";
import React, {useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {Button, FormControl, InputGroup, Spinner, Table} from "react-bootstrap";
import {useGenerateBillsQuery} from "../redux/drinks.api";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAnglesLeft, faPrint} from "@fortawesome/free-solid-svg-icons";
import {MONTHS} from "../shared/Constants";

function GenerateBills() {
	let navigate = useNavigate();
	let {state} = useLocation();
	state = state || {};

	useEffect(() => {
		if (!state.year || !state.month) {
			navigate("/admin");
		}
	}, []);

	const {year, month, userId, user} = state;
	const {data, isFetching, error} = useGenerateBillsQuery({year, month, userId});

	if (isFetching) {
		return (
			<div className={"text-center m-3"}>
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
		<div className={"mt-2"}>
			<div className={"d-flex flex-row justify-content-between meta-info"}>
				<div>
					<Button onClick={() => navigate(-1)}><FontAwesomeIcon icon={faAnglesLeft}/> Go back</Button>
				</div>
				<div>
					<InputGroup>
						<InputGroup.Text>Year</InputGroup.Text>
						<FormControl
							type={"text"}
							readOnly
							value={year}
						/>
						<InputGroup.Text>Month</InputGroup.Text>
						<FormControl
							type={"text"}
							readOnly
							value={MONTHS.find(x => x.id === month).name}
						/>
						{
							user ? (
								<>
									<InputGroup.Text>Employee</InputGroup.Text>
									<FormControl
										type={"text"}
										readOnly
										value={user.name}
									/>
								</>
							) : ""
						}
					</InputGroup>
				</div>
				<div className={"text-end"}><Button onClick={() => window.print()}>
					<FontAwesomeIcon icon={faPrint}/> Print
				</Button></div>
			</div>
			<div className={`mt-2 bills-container ${data.length < 3 ? "max-w" : ""}`}>
				{
					data.map(d => (
						<div key={d.id} className={"border border-2"}>
							<Table className={"bill-table"} bordered>
								<tbody>
									<tr>
										<th colSpan={2} className={"text-center"}>
											{MONTHS.find(x => x.id === month).name} {year}
										</th>
									</tr>
									<tr>
										<th>Name</th>
										<td>{d.userName}</td>
									</tr>
									<tr>
										<th>Quantity</th>
										<td>{d.count} {d.deleted ? `(-${d.deleted})` : ""}</td>
									</tr>
									<tr>
										<th>Amount</th>
										<td>{d.amount}</td>
									</tr>
									<tr>
										<th>Depositor Sign &amp; Date</th>
										<td></td>
									</tr>
									<tr>
										<th>Receiver Sign &amp; Date</th>
										<td></td>
									</tr>
								</tbody>
							</Table>
						</div>
					))
				}
			</div>
		</div>
	);
}

export default GenerateBills;