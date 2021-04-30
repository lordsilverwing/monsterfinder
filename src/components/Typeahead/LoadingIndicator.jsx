import React from "react";
import { FaSpinner } from "react-icons/fa";

const propTypes = {

};

const LoadingIndicator = () => {
	return (
		<FaSpinner className="animate-pulse" />
	)
}

LoadingIndicator.propTypes = propTypes;

export default LoadingIndicator;