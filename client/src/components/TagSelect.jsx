import { useState, useCallback, useEffect } from "react";
import { ReactTags } from "react-tag-autocomplete";
import { UseContextStore } from "../context/ContextProvider.jsx";
import "../components/css/ReactTags.css";

const MIN_SELECTED_LENGTH = 3;

function TagSelect({ suggestions, type, preferred }) {

	const {
		setSelectedCats,
		setSelectedSubCats,
		setSelectedTags
	} = UseContextStore();

	const preferredArr = () => {
		let arr = preferred.split(',').map(item => {
			let id= parseInt(item);
			return suggestions.filter(i => i.value === id)[0];
		});
		return (arr.length !== 0) ? arr : [];
	};

	const [selected, setSelected] = useState(preferredArr);

	// save selected items in context store
	useEffect(() => {
		if (type === "cats") setSelectedCats(selected.map(i => i.value).join(','));
		if (type === "subcats") setSelectedSubCats(selected.map(i => i.value).join(','));
		if (type === "tags") setSelectedTags(selected.map(i => i.value).join(','));
	}, [selected])


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
