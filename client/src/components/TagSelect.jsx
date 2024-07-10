import { useState, useCallback } from "react";
import {ReactTags} from "react-tag-autocomplete";
import "../components/css/ReactTags.css";

const MIN_SELECTED_LENGTH = 3;

function TagSelect({ suggestions }) {
	const [selected, setSelected] = useState([]);
	const onAdd = useCallback((newTag) => {
		setSelected((prevSelected) => [...prevSelected, newTag]);
	}, [selected]);
	const onDelete = useCallback((index) => {
		setSelected((prevSelected) => prevSelected.filter((_, i) => i !== index));
	}, [selected]);
	const isInvalid = selected.length < MIN_SELECTED_LENGTH;

	return (
		<ReactTags
			ariaDescribedBy="custom-validity-description"
			ariaErrorMessage="error"
			isInvalid={isInvalid}
			id="cats"
			onDelete={onDelete}
			onAdd={onAdd}
			selected={selected}
			suggestions={suggestions}
			placeholderText=""
		/>
	)
}

export default TagSelect;
