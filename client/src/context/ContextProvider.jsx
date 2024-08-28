import {createContext, useContext, useEffect, useState} from 'react';
const Context = createContext();
export const UseContextStore = () => useContext(Context);

export const ContextProvider = ({children}) => {

	const [selectedCats, setSelectedCats] = useState("");
	const [selectedSubCats, setSelectedSubCats] = useState("");
	const [selectedTags, setSelectedTags] = useState("");
	const [updatedImages, setUpdatedImages] = useState([]);

	const [pref, setPref] = useState([]);

	useEffect(() => {}, []);

	const values = {
		updatedImages,
		setUpdatedImages,
		selectedCats,
		selectedSubCats,
		selectedTags,
		setSelectedCats,
		setSelectedSubCats,
		setSelectedTags,
		pref,
		setPref
	};

	return <Context.Provider value={values}>{children}</Context.Provider>;
}
