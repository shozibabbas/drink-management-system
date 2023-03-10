import React from "react";
import {useSelector} from "react-redux";
import {selectCriticalError} from "./redux/critical-error.slice";
import CriticalError from "./shared/CriticalError";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import ProtectedRoute from "./shared/ProtectedRoute";
import AuthLayout from "./auth/AuthLayout";
import Login from "./auth/Login";
import DrinksLayout from "./drinks/DrinksLayout";
import DrinksListing from "./drinks/DrinksListing";
import ConsumeDrink from "./drinks/ConsumeDrink";
import IndexRedirection from "./IndexRedirection";
import GuestConsumeDrink from "./guest/GuestConsumeDrink";
import AdminLayout from "./admin/AdminLayout";
import AdminListing from "./admin/AdminListing";
import GenerateBills from "./admin/GenerateBills";

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
				<Route path="/drinks" element={
					<ProtectedRoute>
						<DrinksLayout>
							<DrinksListing/>
						</DrinksLayout>
					</ProtectedRoute>
				}/>
				<Route path="/drinks/consume" element={
					<ProtectedRoute>
						<ConsumeDrink/>
					</ProtectedRoute>
				}/>
				<Route path="/guest" element={
					<GuestConsumeDrink/>
				}/>
				<Route path="/auth" element={<AuthLayout/>}>
					<Route path="login" element={<Login/>}/>
					<Route index element={<Navigate to="/auth/login" replace/>}/>
				</Route>
				<Route path="/admin" element={<AdminLayout/>}>
					<Route path="generate-bills" element={
						<ProtectedRoute>
							<GenerateBills/>
						</ProtectedRoute>
					}/>
					<Route index element={
						<ProtectedRoute>
							<AdminListing/>
						</ProtectedRoute>
					}/>
				</Route>
				<Route path="/" element={<IndexRedirection/>}/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;