import { useState, useCallback, useEffect } from "react";
import { ReactTags } from "react-tag-autocomplete";
import { UseContextStore } from "../context/ContextProvider.jsx";
import "../components/css/ReactTags.css";

const MIN_SELECTED_LENGTH = 3;

function TagSelect({ suggestions, type }) {

	const {
		setSelectedCats,
		setSelectedSubCats,
		setSelectedTags
	} = UseContextStore();

	const [selected, setSelected] = useState([]);

	const onAdd = useCallback((newTag) => {
		setSelected((prevSelected) => [...prevSelected, newTag]);
	}, [selected]);

	const onDelete = useCallback((index) => {
		setSelected((prevSelected) => prevSelected.filter((_, i) => i !== index));
	}, [selected]);

	const isInvalid = selected.length < MIN_SELECTED_LENGTH;

	useEffect(() => {
		if (type === "cats") setSelectedCats(selected);
		if (type === "subcats") setSelectedSubCats(selected);
		if (type === "tags") setSelectedTags(selected);
	}, [selected])

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
