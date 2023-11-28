import React, { useState } from 'react';
import AttributeContext from './AttributeContext';

const AttributeContextProvider = ({ children }) => {
	const [modalInput, setModalInput] = useState({ status: 1 });
	const [isEditMode, setIsEditMode] = useState(false);

	return (
		<AttributeContext.Provider value={{ modalInput, setModalInput, isEditMode, setIsEditMode }}>
			{children}
		</AttributeContext.Provider>
	);
};

export default AttributeContextProvider;
