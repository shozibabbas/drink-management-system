import React from "react";
import PropTypes from "prop-types";
import DrinksNavbar from "./DrinksNavbar";

DrinksLayout.propTypes = {
	children: PropTypes.any
};

function DrinksLayout({children}) {
	return (
		<>
			<DrinksNavbar/>
			{children}
		</>
	);
}

export default DrinksLayout;