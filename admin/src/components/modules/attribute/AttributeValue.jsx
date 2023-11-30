import { useState } from 'react';
import ValueDetailsModals from './ValueDetailsModals';

const AttributeValue = (props) => {
	const [attrValue, setAttrValue] = useState();
	const [valueModalShow, setValueModalShow] = useState(false);

	const handleAttrValueDetailsOpen = (value) => {
		setAttrValue(value);
		setValueModalShow(true);
	};

	return (
		<>
			<div className='value-container-parent'>
				{props.value != undefined
					? props.value.map((value, index) => (
							<div className='value-container' key={index}>
								{value.name}
								<div className='value-buttons'>
									<button onClick={() => handleAttrValueDetailsOpen(value)} className='btn btn-info'>
										<i className='fa-solid fa-eye'></i>
									</button>
									<button className='btn btn-warning'>
										<i className='fa-solid fa-edit'></i>
									</button>
									<button className='btn btn-danger'>
										<i className='fa-solid fa-trash'></i>
									</button>
								</div>
							</div>
					  ))
					: null}
			</div>
			<ValueDetailsModals
				title={'Attribute Value Details'}
				show={valueModalShow}
				onHide={() => setValueModalShow(false)}
				details={attrValue}
			/>
		</>
	);
};

export default AttributeValue;
