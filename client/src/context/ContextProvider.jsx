import {createContext, useContext, useEffect, useState} from 'react';
const Context = createContext();
export const UseContextStore = () => useContext(Context);

export const ContextProvider = ({children}) => {

	const [selectedTags, setSelectedTags] = useState([]);

	useEffect(() => {}, []);

	const values = {
		selectedTags,
		setSelectedTags,
	};

	return <Context.Provider value={values}>{children}</Context.Provider>;
}
