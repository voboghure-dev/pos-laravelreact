import React, { useState } from 'react';
import AttributeContext from './AttributeContext';

const AttributeContextProvider = ({ children }) => {
	const [attributeModalInput, setAttributeModalInput] = useState({ status: 1 });
	const [valueModalInput, setValueModalInput] = useState({ status: 1 });
	const [valueUpdate, setValueUpdate] = useState('');
	const [isEditMode, setIsEditMode] = useState(false);

	return (
		<AttributeContext.Provider
			value={{
				attributeModalInput,
				setAttributeModalInput,
				valueModalInput,
				setValueModalInput,
				isEditMode,
				setIsEditMode,
				valueUpdate,
				setValueUpdate
			}}
		>
			{children}
		</AttributeContext.Provider>
	);
};

export default AttributeContextProvider;
