import axios from 'axios';
import { useContext, useRef, useState } from 'react';
import Swal from 'sweetalert2';
import Modal from 'react-bootstrap/Modal';
import Constants from '../../../Constants';
import AttributeContext from '../../../context/AttributeContext';

const ValueModal = (props) => {
	const { reload, ...others } = props;
	const { valueModalInput, setValueModalInput, setValueUpdate, isEditMode } = useContext(AttributeContext);
	const nameRef = useRef();
	const [errors, setErrors] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const handleInput = (e) => {
		setValueModalInput((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
	};

	const handleAttributeValueAdd = () => {
		setIsLoading(true);
		axios
			.post(`${Constants.BASE_URL}/attribute-value`, valueModalInput)
			.then((response) => {
				setIsLoading(false);
				Swal.fire({
					position: 'top-end',
					icon: response.data.cls,
					title: response.data.msg,
					showConfirmButton: false,
					toast: true,
					timer: 1500,
				});
				props.onHide();
				reload();
			})
			.catch((errors) => {
				setIsLoading(false);
				if (errors.response.status == 422) {
					setErrors(errors.response.data.errors);
				}
			});
	};

	const handleAttributeValueEdit = (id) => {
		setIsLoading(true);
		axios
			.put(`${Constants.BASE_URL}/attribute-value/${id}`, valueModalInput)
			.then((response) => {
				setIsLoading(false);
				Swal.fire({
					position: 'top-end',
					icon: response.data.cls,
					title: response.data.msg,
					showConfirmButton: false,
					toast: true,
					timer: 1500,
				});
				setValueUpdate(valueModalInput.name);
				props.onHide();
			})
			.catch((errors) => {
				setIsLoading(false);
				if (errors.response.status == 422) {
					setErrors(errors.response.data.errors);
				}
			});
	};

	const handleResetAttributeValue = (id) => {
		setValueModalInput({ attribute_id: id, name: '', status: 1 });
		setErrors([]);
		nameRef.current.focus();
	};

	return (
		<Modal {...others} aria-labelledby='brand-details-modal' centered>
			<Modal.Header closeButton>
				<Modal.Title id='brand-details-modal'>{props.title}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div className='row'>
					<div className='col-md-12'>
						<label className='small mb-1' htmlFor='name'>
							Name
						</label>
						<input
							className={errors.name != undefined ? 'form-control is-invalid' : 'form-control'}
							name='name'
							id='name'
							ref={nameRef}
							value={valueModalInput.name || ''}
							onChange={handleInput}
							type='text'
							placeholder='Enter supplier company name'
							autoFocus
						/>
						<div className='invalid-feedback'>{errors.name != undefined ? errors.name[0] : null}</div>
					</div>
					<div className='col-md-12 mb-3'>
						<label className='small mb-1' htmlFor='status'>
							Status
						</label>
						<select
							className={errors.status != undefined ? 'form-select is-invalid' : 'form-select'}
							name='status'
							id='status'
							value={valueModalInput.status || 1}
							onChange={handleInput}
						>
							<option value={1}>Active</option>
							<option value={0}>Inactive</option>
						</select>
						<div className='invalid-feedback'>{errors.status != undefined ? errors.status[0] : null}</div>
					</div>
				</div>
			</Modal.Body>
			<Modal.Footer className='d-flex justify-content-between'>
				<button
					onClick={() => handleResetAttributeValue(valueModalInput.attribute_id)}
					type='button'
					className='btn btn-danger'
				>
					Reset
				</button>
				<button
					onClick={isEditMode ? () => handleAttributeValueEdit(valueModalInput.id) : handleAttributeValueAdd}
					type='button'
					className='btn btn-primary'
					dangerouslySetInnerHTML={{
						__html: isLoading
							? '<span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> Loading...'
							: 'Save changes',
					}}
				/>
			</Modal.Footer>
		</Modal>
	);
};

export default ValueModal;
