import React from "react";
import {ErrorMessage, Field, FieldArray, Formik} from "formik";
import {Button, Form, Spinner, Table} from "react-bootstrap";
import {useBulkConsumeDrinksMutation, useGetDrinkingUsersQuery, useGetDrinksQuery} from "../redux/drinks.api";
import CreatableSelect from "react-select/creatable";
import * as Yup from "yup";
import {useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashAlt} from "@fortawesome/free-solid-svg-icons";

const addBulkSchema = Yup.object().shape({
	inputs: Yup.array()
		.of(
			Yup.object().shape({
				email: Yup.string().email().required("Email cannot be empty"),
				name: Yup.string().required("Name cannot be empty"),
				quantity: Yup.number().required("quantity cannot be empty").min(1).max(5),
				drinkId: Yup.number().required("Drink is not selected")
			})
		)
		.required("Required"),
	taskSchedules: Yup.array(),
});

function AdminAddBulk() {
	const navigate = useNavigate();
	const {data: drinks, isLoading: drinksFetching, error: drinksError} = useGetDrinksQuery();
	const {
		data: drinkingUsers,
		isLoading: drinkingUsersIsFetching,
		error: drinkingUsersError
	} = useGetDrinkingUsersQuery();
	const [bulkConsumeDrink, {isFetching, isSuccess, isUninitialized}] = useBulkConsumeDrinksMutation();

	if (drinksFetching || drinkingUsersIsFetching) {
		return (
			<div className={"text-center m-3"}>
				<Spinner animation={"border"}/>
			</div>
		);
	}
	if (drinksError || drinkingUsersError) {
		return (
			<div>
				{JSON.stringify(drinksError || drinkingUsersError, null, 2)}
			</div>
		);
	}
	return (
		<div className={"w-100"}>
			<h2 className={"text-center my-3"}>Bulk Input Form</h2>
			<Formik
				initialValues={{inputs: [{email: "", name: "", quantity: "", drinkId: ""}]}}
				onSubmit={values => {
					bulkConsumeDrink(values);
				}}
				validationSchema={addBulkSchema}
			>
				{({values, handleSubmit}) => (
					<Form onSubmit={handleSubmit}>
						<FieldArray name="inputs">
							{({push, remove}) => (
								<Table hover striped bordered className={"table-add-bulk"}>
									<thead>
										<tr>
											<th className={"email"}>Email</th>
											<th className={"name"}>Name</th>
											<th className={"drink"}>Drink</th>
											<th className={"quantity"}>Quantity</th>
											<th className={"actions"}>Actions</th>
										</tr>
									</thead>
									<tbody>
										{values.inputs.map((input, index) => (
											<tr key={index}>
												<td>
													<Form.Group controlId={`inputs.${index}.email`}>
														{/*<Form.Label>Email</Form.Label>*/}
														<Field
															name={`inputs.${index}.email`}
														>
															{({field, form}) => (
																<CreatableSelect
																	isClearable
																	onChange={(entry) => {
																		form.setFieldValue(`inputs.${index}.email`, entry ? entry.value : "");
																		const existingUser = entry ? drinkingUsers.find(x => x.email === entry.value) : null;
																		if (existingUser) {
																			form.setFieldValue(`inputs.${index}.name`, existingUser.name);
																		}
																	}}
																	name={field.name}
																	value={field.value ? {
																		label: field.value,
																		value: field.value
																	} : ""}
																	options={drinkingUsers.map(user => ({
																		value: user.email,
																		label: user.email,
																	}))}
																	placeholder={"Enter email"}
																/>
															)}
														</Field>
														<ErrorMessage
															name={`inputs.${index}.email`}>
															{(msg) => (
																<Form.Control.Feedback className={"d-block"}
																	type={"invalid"}>
																	{msg}
																</Form.Control.Feedback>
															)}
														</ErrorMessage>
													</Form.Group>
												</td>
												<td>
													<Form.Group controlId={`inputs.${index}.name`}>
														{/*<Form.Label>Name</Form.Label>*/}
														<Field
															name={`inputs.${index}.name`}
														>
															{({field, form}) => (
																<CreatableSelect
																	isClearable
																	onChange={(entry) => {
																		form.setFieldValue(`inputs.${index}.name`, entry ? entry.value : "");
																		const existingUser = entry ? drinkingUsers.find(x => x.name === entry.value) : null;
																		if (existingUser) {
																			form.setFieldValue(`inputs.${index}.email`, existingUser.email);
																		}
																	}}
																	name={field.name}
																	value={field.value ? {
																		label: field.value,
																		value: field.value
																	} : ""}
																	options={drinkingUsers.map(user => ({
																		value: user.name,
																		label: user.name,
																	}))}
																	placeholder={"Enter name"}
																/>
															)}
														</Field>
														<ErrorMessage
															name={`inputs.${index}.name`}
														>
															{(msg) => (
																<Form.Control.Feedback className={"d-block"}
																	type={"invalid"}>
																	{msg}
																</Form.Control.Feedback>
															)}
														</ErrorMessage>
													</Form.Group>
												</td>
												<td>
													<Form.Group controlId={`inputs.${index}.drinkId`}>
														{/*<Form.Label>Drink</Form.Label>*/}
														<Field
															name={`inputs.${index}.drinkId`}
														>
															{({field, form}) => (
																<CreatableSelect
																	isClearable
																	isSearchable={false}
																	onChange={(entry) => {
																		form.setFieldValue(`inputs.${index}.drinkId`, entry ? entry.value : "");
																	}}
																	name={field.name}
																	value={field.value ? {
																		label: drinks.find(x => x.id === field.value).name,
																		value: field.value
																	} : ""}
																	options={drinks.map(d => ({
																		value: d.id,
																		label: d.name,
																	}))}
																	placeholder={"Select Drink"}
																/>
															)}
														</Field>
														<ErrorMessage
															name={`inputs.${index}.drinkId`}
														>
															{(msg) => (
																<Form.Control.Feedback className={"d-block"}
																	type={"invalid"}>
																	{msg}
																</Form.Control.Feedback>
															)}
														</ErrorMessage>
													</Form.Group>
												</td>
												<td>
													<Form.Group controlId={`inputs.${index}.quantity`}>
														{/*<Form.Label>Quantity</Form.Label>*/}
														<Field
															type="number"
															name={`inputs.${index}.quantity`}
															as={Form.Control}
															placeholder={"Enter quantity"}
														/>
														<ErrorMessage
															name={`inputs.${index}.quantity`}
														>
															{(msg) => (
																<Form.Control.Feedback className={"d-block"}
																	type={"invalid"}>
																	{msg}
																</Form.Control.Feedback>
															)}
														</ErrorMessage>
													</Form.Group>
												</td>
												<td>
													<Button variant="outline-danger" type="button"
														onClick={() => remove(index)}>
														<FontAwesomeIcon icon={faTrashAlt} className={"me-2"}/>Remove
													</Button>
												</td>
											</tr>

										))}
										<tr>
											<td colSpan={5} className={"text-center"}>
												<Button variant="primary" type="button"
													onClick={() => push({
														email: "",
														name: "",
														quantity: "",
														drinkId: ""
													})}>
                                                Add Input
												</Button>
											</td>
										</tr>
									</tbody>
								</Table>
							)}
						</FieldArray>
						<Button disabled={isFetching || (isSuccess && !isUninitialized)} variant="success"
							type="submit">
							{
								isSuccess && !isUninitialized ? (
									"Entries saved"
								) : "Submit"
							}
						</Button>
						{
							isSuccess && !isUninitialized && (
								<>
									<Button type="button" className={"ms-2"}
										onClick={() => window.location.reload()}>
                                        Add More
									</Button>
									<Button type="button" variant={"secondary"}
										className={"ms-2"}
										onClick={() => navigate("/admin")}>
                                        See All Drinks
									</Button>
								</>
							)
						}
					</Form>
				)}
			</Formik>
		</div>
	);
}

export default AdminAddBulk;