import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form, ListGroup } from "react-bootstrap";
import LoadingIndicator from "./LoadingIndicator";

const DEFAULT_SUGGESTION_INDEX = -1;
let timeout;

const propTypes = {
	fetchAllOnOpen: PropTypes.bool,
	getDetails: PropTypes.func,
	getSuggestions: PropTypes.func,
	inputDelay: PropTypes.number,
	maxSuggestions: PropTypes.number,
	onChange: PropTypes.func,
	performAction: PropTypes.func,
	placeholder: PropTypes.string,
	value: PropTypes.string
};

/**
 * @param {Object} props - typeahead props
 * @param {bool} props.fetchAllOnOpen - indicates all the values should be fetched initially (default: false)
 * @param {func} props.getDetails - function that returns selection details by id
 * @param {func} props.getSuggestions - function that returns selections as [{ text: "", id: "" }]
 * @param {number} props.inputDelay - milliseconds before execution of suggestion retreival (default: 1500)
 * @param {number} props.maxSuggestions - number of suggestions to display (default: 5)
 * @param {func} props.performAction - Callback function call when selection is chosen
 * @param {string} props.placeholder - text to display when no input has been provided
 * @param {string} props.value - initial value of the input
 * @returns 
 */
const Typeahead = ({
	fetchAllOnOpen = false,
	getDetails,
	getSuggestions = async () => ([]),
	inputDelay = 1500,
	maxSuggestions = 5,
	onChange = () => {},
	performAction,
	placeholder = "Begin typing...",
	value = ""
}) => {
	const [inputValue, setInputValue] = useState(value);
	const [isFetching, setIsFetching] = useState(false);
	const [suggestionIndex, setSuggestionIndex] = useState(DEFAULT_SUGGESTION_INDEX);
	const [suggestions, setSuggestions] = useState([]);
	const [suggestionsVisible, setSuggestionVisibility] = useState(false);

	const retrieveSuggestions = async (input) => {
		const response = await getSuggestions(input)
		setSuggestions(response);
		setIsFetching(false);
	};

	const loadSuggestions = async (input) => {
			setSuggestionVisibility(true);
			setIsFetching(true);
			!!timeout && clearTimeout(timeout);
			timeout = setTimeout(() => retrieveSuggestions(input), inputDelay);
	}

	const handleInputChange = async (newInputValue) => {
		setInputValue(newInputValue)
		if(!fetchAllOnOpen) {
			await loadSuggestions(newInputValue);
		}
	}

	const handleSuggestionClick = async (id, text) => {
		setInputValue(text);
		if(!!id) {
			setIsFetching(true);

			if(!!getDetails) {
				const selection = await getDetails(id);
				onChange(selection);
			}

			if(!!performAction) {
				performAction(id);
			}

			setSuggestionIndex(DEFAULT_SUGGESTION_INDEX);
			setSuggestionVisibility(false);
			setIsFetching(false);
		}
	}

	const nextIndex = () => {
		let newIndex = suggestionIndex + 1;
		if(newIndex >= suggestions.length) {
			newIndex = 0;
		}
		setSuggestionIndex(newIndex);
	}

	const prevIndex = () => {
		let newIndex = suggestionIndex - 1;
		if(newIndex < 0) {
			newIndex = suggestions.length - 1;
		}
		setSuggestionIndex(newIndex);
	}
	
	const handleKeyDown = (evt) => {
		if(!!suggestionsVisible && !!suggestions && !!suggestions.length) {
			switch(evt.keyCode) {
				case 40: // down arrow
					nextIndex();
					break;
				case 38: // up arrow
					prevIndex();
					break;
				case 9: // tab
					evt.preventDefault(); 
					evt.stopPropagation();
					nextIndex();
					break;
				case 13: // Enter
					evt.preventDefault(); 
					evt.stopPropagation();
					const {id, text} = suggestions[Math.max(suggestionIndex, 0)];
					handleSuggestionClick(id, text);
					break;
				case 27: // escape
					setSuggestionVisibility(false)
					break;
				default:
					break;
			}
		}
	}

	const handleInputFocus = async () => {
		if(!suggestions.length) {
			loadSuggestions(inputValue || value);
			return;
		}

		if(!!fetchAllOnOpen && !suggestions.length) {
			loadSuggestions("");
			return;
		}

		setSuggestionVisibility(true);
	}

	const filterSuggestions = (suggestions = [], val = "") => {
		if(!!fetchAllOnOpen && !!val) {
			const regex = new RegExp(val, "i");

			const textMatches = ({ text = "" }) => (text.toLowerCase().match(regex) || []).length;
			const highlight = ({ text, id }) => ({ html: text.replace(regex, "<strong>$&</strong>"), text, id });

			return suggestions.filter(textMatches).map(highlight).slice(0, maxSuggestions);
		}
		return suggestions.slice(0, maxSuggestions);
	}
	
	return (
		<div className="typeahead">
			<Form.Control 
				placeholder={placeholder}
				type="text" 
				value={inputValue || value} 
				onChange={(evt) => handleInputChange(evt.target.value)}
				onFocus={handleInputFocus}
				onBlur={() => setSuggestionVisibility(false)}
				onKeyDown={handleKeyDown}
			/>				
			{ !!suggestionsVisible && (!!isFetching || (!!suggestions && !!suggestions.length)) && 
				<ListGroup>
					{ !!isFetching && <ListGroup.Item className="text-center"><LoadingIndicator /></ListGroup.Item> }
					{ filterSuggestions(suggestions, inputValue).map((s, i) => {
							const className = i === suggestionIndex ? "active" : "";
							return (<ListGroup.Item 
								key={`suggestion-${i}`} 
								action 
								onMouseDown={() => handleSuggestionClick(s.id, s.text)}
								className={className}
								dangerouslySetInnerHTML={{__html: (s.html || s.text)}}
							>
							</ListGroup.Item>) 
						})
					}
				</ListGroup>
			}		
		</div>
	)
}

Typeahead.propTypes = propTypes;

export default Typeahead;