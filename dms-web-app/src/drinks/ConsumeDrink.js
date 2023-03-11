import React from "react";
import {Button, Col, Container, Form, FormControl, FormGroup, Row, Spinner} from "react-bootstrap";
import {Formik} from "formik";
import {useSelector} from "react-redux";
import {selectDrinkPreference, selectUserDetails} from "../redux/user.slice";
import {useConsumeDrinkMutation, useGetDrinksQuery} from "../redux/drinks.api";
import {useNavigate} from "react-router-dom";
import DMSNavbar from "../shared/DMSNavbar";

function ConsumeDrink() {
	const navigate = useNavigate();
	const {name, email} = useSelector(selectUserDetails);
	const drinkPreference = useSelector(selectDrinkPreference);
	const {data: drinks, isLoading: drinksIsLoading, error: drinksError} = useGetDrinksQuery();
	const [consumeDrink, {isLoading, isSuccess, isUninitialized}] = useConsumeDrinkMutation();

	if (drinksIsLoading) {
		return (
			<div>
				<Spinner animation={"border"}/>
			</div>
		);
	}
	if (drinksError) {
		return (
			<div>
				{JSON.stringify(drinksError, null, 2)}
			</div>
		);
	}
	return (
		<div className={"min-vh-100 d-flex flex-column"}>
			<DMSNavbar/>
			<Container fluid={true} className={"flex-grow-1 d-grid"}>
				<Row>
					<Col className={"d-flex flex-column justify-content-evenly"}>
						<Row>
							<Col sm={{offset: 2, span: 8}} md={{offset: 3, span: 6}}>
								<h2 className={"text-center"}>Consume Drink</h2>
								<p className={"text-center text-secondary"}>{name}</p>
								<p className={"text-center mb-5 text-secondary"}>{email}</p>
								<Formik
									initialValues={{...drinkPreference}}
									validate={values => {
										const errors = {};
										if (values.drinkId === 0) {
											errors.drinkId = "Drink is Required";
										}
										if (values.quantity < 1) {
											errors.quantity = "Invalid quantity";
										}
										return errors;
									}}
									onSubmit={(values) => {
										consumeDrink(values);
									}}
								>
									{({
										values,
										errors,
										touched,
										handleChange,
										handleBlur,
										handleSubmit,
										setFieldValue
									}) => (
										<Form onSubmit={handleSubmit}>
											<FormGroup className={"position-relative"}>
												<Form.Select
													name="drinkId"
													onChange={(e) => {
														setFieldValue(e.target.name, parseInt(e.target.value));
													}}
													onBlur={(e) => {
														setFieldValue(e.target.name, parseInt(e.target.value));
													}}
													value={values.drinkId}
													isInvalid={touched.drinkId && errors.drinkId}
												>
													<option value={0}>Select a Drink</option>
													{
														drinks.map(d => (
															<option key={d.id} value={d.id}>{d.name}</option>
														))
													}
												</Form.Select>
												<Form.Control.Feedback type={"invalid"}>
													{errors.drinkId}
												</Form.Control.Feedback>
											</FormGroup>
											<FormGroup className={"position-relative"}>
												<FormControl
													type="number"
													name="quantity"
													placeholder={"Quantity"}
													onChange={handleChange}
													onBlur={handleBlur}
													value={values.quantity}
													className={"mt-2"}
													isInvalid={touched.quantity && errors.quantity}
													min={1}
													max={5}
												/>
												<Form.Control.Feedback type={"invalid"}>
													{errors.quantity}
												</Form.Control.Feedback>
											</FormGroup>
											{
												isSuccess && !isUninitialized ? (
													<div className={"d-flex flex-column justify-content-center mt-3"}>
														<p className={"text-center"}>{values.quantity} serving(s)
                                                            of {drinks.find(x => x.id === values.drinkId).name} Consumed</p>
														<Button type="button" className={"w-100"}
															onClick={() => window.location.reload()}>
                                                            Drink Another
														</Button>
														<Button type="button" variant={"secondary"}
															className={"w-100 mt-2"}
															onClick={() => navigate("/drinks")}>
                                                            See All Drinks
														</Button>
													</div>
												) : (
													<div className={"d-flex justify-content-center mt-3"}>
														<Button type="submit" disabled={isLoading} className={" w-100"}>
															{isLoading ? (
																<>
																	<Spinner animation={"border"} size={"sm"}/>
																	<span className={"ms-2"}>Drinking</span>
																</>
															) : (
																<span>Drink Now</span>
															)}
														</Button>
													</div>
												)
											}

										</Form>
									)}
								</Formik>
							</Col>
						</Row>
					</Col>
				</Row>
			</Container>
		</div>
	);
}

export default ConsumeDrink;