import React from "react";
import PropTypes from "prop-types";
import {useSelector} from "react-redux";
import {selectIsLoggedIn} from "../redux/user.slice";
import {Navigate} from "react-router-dom";

ProtectedRoute.propTypes = {
	children: PropTypes.node
};

function ProtectedRoute({children}) {
	const isLoggedIn = useSelector(selectIsLoggedIn);
	if (!isLoggedIn) {
		return <Navigate to="/auth/login?prompt=1"/>;
	}
	return children;
}

export default ProtectedRoute;