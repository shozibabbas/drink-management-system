import React from "react";
import {Formik} from "formik";
import {Alert, Button, Form, FormControl, FormGroup, FormLabel, Spinner} from "react-bootstrap";
import {useLoginMutation} from "../redux/auth.api";
import {useNavigate, useSearchParams} from "react-router-dom";

Login.propTypes = {};

function Login() {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const [login, {isLoading, error}] = useLoginMutation();

	return (
		<Formik
			initialValues={{email: "", password: ""}}
			onSubmit={(values) => {
				login(values)
					.unwrap()
					.then(() => {
						navigate("/");
					});
			}}
		>
			{({
				values,
				handleChange,
				handleBlur,
				handleSubmit
			}) => (
				<Form className={"w-100"} onSubmit={handleSubmit}>
					{error ? (
						<Alert variant={"danger"} className={"mb-4"}>{error?.data?.message}</Alert>
					)
						:
						searchParams.has("prompt") &&
                        <Alert variant={"warning"} className={"mb-4"}>You need to login to continue</Alert>}
					<FormGroup className={"mt-2"}>
						<FormLabel>Email</FormLabel>
						<FormControl
							type="email"
							name="email"
							placeholder={"Enter email here"}
							onChange={handleChange}
							onBlur={handleBlur}
							value={values.email}
						/>
					</FormGroup>
					<FormGroup className={"mt-2"}>
						<FormLabel>Password</FormLabel>
						<FormControl
							type="password"
							name="password"
							placeholder={"Password"}
							onChange={handleChange}
							onBlur={handleBlur}
							value={values.password}
						/>
					</FormGroup>
					<div className={"d-flex justify-content-center mt-3"}>
						<Button type="submit" disabled={isLoading} className={" w-100"}>
							{isLoading ? (
								<>
									<Spinner animation={"border"} size={"sm"}/>
									<span className={"ms-2"}>Logging in</span>
								</>
							) : (
								<span>Login</span>
							)}
						</Button>
					</div>
				</Form>
			)}
		</Formik>
	);
}

export default Login;