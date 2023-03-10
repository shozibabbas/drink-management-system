import React from "react";
import {createUltimatePagination, ITEM_TYPES} from "react-ultimate-pagination";
import {Pagination} from "react-bootstrap";
import PropTypes from "prop-types";


const WrapperComponent = ({children}) => (
	<Pagination>{children}</Pagination>
);
WrapperComponent.propTypes = {
	children: PropTypes.any
};


const Page = ({value, isActive, onClick}) => (
	<Pagination.Item active={isActive} onClick={onClick}>
		{value}
	</Pagination.Item>
);
Page.propTypes = {
	value: PropTypes.number,
	isActive: PropTypes.bool,
	onClick: PropTypes.func
};


const Ellipsis = ({onClick}) => (
	<Pagination.Ellipsis onClick={onClick}/>
);
Ellipsis.propTypes = {
	onClick: PropTypes.func
};


const FirstPageLink = ({onClick}) => (
	<Pagination.First onClick={onClick}/>
);
FirstPageLink.propTypes = {
	onClick: PropTypes.func
};


const PreviousPageLink = ({onClick}) => (
	<Pagination.Prev onClick={onClick}/>
);
PreviousPageLink.propTypes = {
	onClick: PropTypes.func
};

const NextPageLink = ({onClick}) => (
	<Pagination.Next onClick={onClick}/>
);
NextPageLink.propTypes = {
	onClick: PropTypes.func
};

const LastPageLink = ({onClick}) => (
	<Pagination.Last onClick={onClick}/>
);
LastPageLink.propTypes = {
	onClick: PropTypes.func
};

const itemTypeToComponent = {
	[ITEM_TYPES.PAGE]: Page,
	[ITEM_TYPES.ELLIPSIS]: Ellipsis,
	[ITEM_TYPES.FIRST_PAGE_LINK]: FirstPageLink,
	[ITEM_TYPES.PREVIOUS_PAGE_LINK]: PreviousPageLink,
	[ITEM_TYPES.NEXT_PAGE_LINK]: NextPageLink,
	[ITEM_TYPES.LAST_PAGE_LINK]: LastPageLink
};

const UltimatePaginationBootstrap5 = createUltimatePagination({itemTypeToComponent, WrapperComponent});

export default UltimatePaginationBootstrap5;