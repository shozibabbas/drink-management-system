import React from "react";
import PropTypes from "prop-types";
import DMSNavbar from "../shared/DMSNavbar";

DrinksLayout.propTypes = {
	children: PropTypes.any
};

function DrinksLayout({children}) {
	return (
		<>
			<DMSNavbar/>
			{children}
		</>
	);
}

export default DrinksLayout;