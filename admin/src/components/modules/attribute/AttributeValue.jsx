import { useContext, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import ValueDetailsModals from './ValueDetailsModals';
import Constants from '../../../Constants';
import AttributeContext from '../../../context/AttributeContext';

const AttributeValue = (props) => {
	const { setValueUpdate } = useContext(AttributeContext);

	const [attrValue, setAttrValue] = useState();
	const [valueModalShow, setValueModalShow] = useState(false);

	const handleAttrValueDetailsOpen = (value) => {
		setAttrValue(value);
		setValueModalShow(true);
	};

	const handleAttrValueDelete = (id) => {
		Swal.fire({
			title: 'Are you sure?',
			text: 'Attribute value will be deleted!',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, delete!',
		}).then((result) => {
			if (result.isConfirmed) {
				axios.delete(`${Constants.BASE_URL}/attribute-value/${id}`).then((res) => {
					setValueUpdate(id);
					Swal.fire({
						position: 'top-end',
						icon: res.data.cls,
						title: res.data.msg,
						showConfirmButton: false,
						toast: true,
						timer: 1500,
					});
				});
			}
		});
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
									<button onClick={() => handleAttrValueDelete(value.id)} className='btn btn-danger'>
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
