import {createContext, useContext, useEffect, useState} from 'react';
const Context = createContext();
export const UseContextStore = () => useContext(Context);

export const ContextProvider = ({children}) => {

	const [selectedCats, setSelectedCats] = useState([]);
	const [selectedSubCats, setSelectedSubCats] = useState([]);
	const [selectedTags, setSelectedTags] = useState([]);
	useEffect(() => {}, []);

	const values = {
		selectedCats,
		selectedSubCats,
		selectedTags,
		setSelectedCats,
		setSelectedSubCats,
		setSelectedTags,
	};

	return <Context.Provider value={values}>{children}</Context.Provider>;
}
