import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {selectGuestDetails, selectIsLoggedIn} from "../redux/user.slice";
import {useGetDrinksQuery, useGuestConsumeDrinkMutation} from "../redux/drinks.api";
import {Button, Col, Container, Form, FormControl, FormGroup, Row, Spinner} from "react-bootstrap";
import {Formik} from "formik";
import * as Yup from "yup";
import {useNavigate} from "react-router-dom";
import DMSNavbar from "../shared/DMSNavbar";

const GuestConsumeDrinkSchema = Yup.object().shape({
	email: Yup.string()
		.email("invalid email")
		.required("Required"),
	name: Yup.string()
		.min(2, "Too Short!")
		.max(75, "Too Long!")
		.required("Required"),
	drinkId: Yup.number().required("Required").min(1, "Invalid drink"),
	quantity: Yup.number().required("Required").min(1, "Invalid quantity").max(5, "Invalid quantity"),
	password: Yup.string().optional()
});

function GuestConsumeDrink() {
	const navigate = useNavigate();
	const isLoggedIn = useSelector(selectIsLoggedIn);
	const guestDetails = useSelector(selectGuestDetails);
	const [showPasswordField, setShowPasswordField] = useState(false);
	const {data: drinks, isLoading: drinksIsLoading, error: drinksError} = useGetDrinksQuery();
	const [consumeDrink, {isLoading, isSuccess, isUninitialized}] = useGuestConsumeDrinkMutation();

	useEffect(() => {
		if (isLoggedIn) {
			navigate("/drinks/consume");
		}
	}, []);

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
								<h2 className={"text-center mt-2"}>Consume Drink</h2>
								<Formik
									initialValues={{...guestDetails}}
									validationSchema={GuestConsumeDrinkSchema}
									onSubmit={(values) => {
										consumeDrink(values)
											.unwrap()
											.then(res => {
												if (res.access_token) {
													navigate("/");
												}
											});
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
												<Form.Label>Email</Form.Label>
												<FormControl
													type="email"
													name="email"
													placeholder={"Enter email here"}
													onChange={handleChange}
													onBlur={handleBlur}
													value={values.email}
													isInvalid={touched.email && errors.email}
													readOnly={isSuccess && !isUninitialized}
												/>
												<Form.Control.Feedback type={"invalid"}>
													{errors.email}
												</Form.Control.Feedback>
											</FormGroup>
											{
												showPasswordField ? (
													<FormGroup className={"position-relative mt-2"}>
														<Form.Label>Password</Form.Label>
														<FormControl
															type="password"
															name="password"
															placeholder={"Enter password here"}
															onChange={handleChange}
															onBlur={handleBlur}
															value={values.password}
															isInvalid={touched.password && errors.password}
															readOnly={isSuccess && !isUninitialized}
														/>
														<Form.Control.Feedback type={"invalid"}>
															{errors.password}
														</Form.Control.Feedback>
													</FormGroup>
												) : (
													<Form.Text className={"cursor-pointer"}
														onClick={() => setShowPasswordField(true)}>
                                                        (For first time users only) Click on
                                                        this
                                                        text to
                                                        also enter password . This will allow you
                                                        to
                                                        login and
                                                        view your daily consumption.</Form.Text>
												)
											}
											<FormGroup className={"position-relative mt-2"}>
												<Form.Label>Name</Form.Label>
												<FormControl
													type="text"
													name="name"
													placeholder={"Enter name here"}
													onChange={handleChange}
													onBlur={handleBlur}
													value={values.name}
													isInvalid={touched.name && errors.name}
													readOnly={isSuccess && !isUninitialized}
												/>
												<Form.Control.Feedback type={"invalid"}>
													{errors.name}
												</Form.Control.Feedback>
											</FormGroup>
											<FormGroup className={"position-relative mt-2"}>
												<Form.Label>Drink</Form.Label>
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
													disabled={isSuccess && !isUninitialized}
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
											<FormGroup className={"position-relative mt-2"}>
												<Form.Label>Quantity</Form.Label>
												<FormControl
													type="number"
													name="quantity"
													placeholder={"Enter quantity here"}
													onChange={handleChange}
													onBlur={handleBlur}
													value={values.quantity}
													isInvalid={touched.quantity && errors.quantity}
													min={1}
													max={5}
													readOnly={isSuccess && !isUninitialized}
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

export default GuestConsumeDrink;