import React, {useEffect} from "react";
import {Navigate, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectIsLoggedIn} from "./redux/user.slice";

function IndexRedirection() {
	const navigate = useNavigate();
	const isLoggedIn = useSelector(selectIsLoggedIn);

	useEffect(() => {
		if (!isLoggedIn) {
			navigate("/guest");
		}
	}, []);

	return (
		<Navigate to="/drinks" replace/>
	);
}

export default IndexRedirection;