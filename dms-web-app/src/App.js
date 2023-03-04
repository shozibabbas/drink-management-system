import React from "react";
import {useSelector} from "react-redux";
import {selectCriticalError} from "./redux/critical-error.slice";
import CriticalError from "./shared/CriticalError";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ProtectedRoute from "./shared/ProtectedRoute";
import AuthLayout from "./auth/AuthLayout";
import Login from "./auth/Login";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCoffee} from "@fortawesome/free-solid-svg-icons";

function App() {
	const criticalError = useSelector(selectCriticalError);
	if (criticalError) {
		return (
			<CriticalError/>
		);
	}
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={
					<ProtectedRoute>
                        This app works! <FontAwesomeIcon icon={faCoffee}/>
					</ProtectedRoute>
				}/>
				<Route path="/auth" element={<AuthLayout/>}>
					<Route path="login" element={<Login/>}/>
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;