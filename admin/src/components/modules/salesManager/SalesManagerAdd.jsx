import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../../partials/Breadcrumb';
import Constants from '../../../Constants';
import axios from 'axios';
import Swal from 'sweetalert2';

const SalesManagerAdd = () => {
	const navigate = useNavigate();
	const [input, setInput] = useState({ status: 1 });
	const [errors, setErrors] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const handleInput = (e) => {
		setInput((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
	};

	const handleLogo = (e) => {
		let file = e.target.files[0];
		let reader = new FileReader();
		reader.onloadend = () => {
			setInput((prevState) => ({ ...prevState, [e.target.name]: reader.result }));
		};
		reader.readAsDataURL(file);
	};

	const handleSalesManagerAdd = () => {
		setIsLoading(true);
		axios
			.post(`${Constants.BASE_URL}/sales-manager`, input)
			.then((res) => {
				setIsLoading(false);
				Swal.fire({
					position: 'top-end',
					icon: res.data.cls,
					title: res.data.msg,
					showConfirmButton: false,
					toast: true,
					timer: 1500,
				});
				navigate('/dashboard/sales-manager');
			})
			.catch((errors) => {
				setIsLoading(false);
				if (errors.response.status == 422) {
					setErrors(errors.response.data.errors);
				}
			});
	};

	const handleSalesManagerReset = () => {
		setInput({
			company_name: '',
			phone_number: '',
			email_address: '',
			status: '',
			description: '',
			logo: undefined,
			address: '',
			division: '',
			district: '',
			area: '',
			land_mark: '',
		});
	};

	return (
		<>
			<Breadcrumb title={'Add Sales Manager'} />

			<div className='row'>
				<div className='col-md-12'>
					<div className='card'>
						<div className='card-header'>
							<h4>Add Sales Manager</h4>
						</div>
						<div className='card-body'>
							<div className='row'>
								<div className='col-md-6 mb-3'>
									<div className='card'>
										<div className='card-header'>
											<h6>Personal Details</h6>
										</div>
										<div className='card-body'>
											<div className='row'>
												<div className='col-md-12'>
													<label className='small mb-1' htmlFor='name'>
														Sales Manager Name
													</label>
													<input
														className={
															errors.name != undefined
																? 'form-control is-invalid'
																: 'form-control'
														}
														name='name'
														id='name'
														value={input.name}
														onChange={handleInput}
														type='text'
														placeholder='Enter sales manager name'
													/>
													<div className='invalid-feedback'>
														{errors.name != undefined ? errors.name[0] : null}
													</div>
												</div>
												<div className='col-md-12'>
													<label className='small mb-1' htmlFor='phone'>
														Phone Number
													</label>
													<input
														className={
															errors.phone != undefined
																? 'form-control is-invalid'
																: 'form-control'
														}
														name='phone'
														id='phone'
														value={input.phone}
														onChange={handleInput}
														type='text'
														placeholder='Enter phone number'
													/>
													<div className='invalid-feedback'>
														{errors.phone != undefined ? errors.phone[0] : null}
													</div>
												</div>
												<div className='col-md-12'>
													<label className='small mb-1' htmlFor='email'>
														Email address
													</label>
													<input
														className={
															errors.email != undefined
																? 'form-control is-invalid'
																: 'form-control'
														}
														name='email'
														id='email'
														value={input.email}
														onChange={handleInput}
														type='text'
														placeholder='Enter email address'
													/>
													<div className='invalid-feedback'>
														{errors.email != undefined ? errors.email[0] : null}
													</div>
												</div>
												<div className='col-md-12'>
													<label className='small mb-1' htmlFor='govt_id_number'>
														Govt. Photo ID Number
													</label>
													<input
														className={
															errors.govt_id_number != undefined
																? 'form-control is-invalid'
																: 'form-control'
														}
														name='govt_id_number'
														id='govt_id_number'
														value={input.govt_id_number}
														onChange={handleInput}
														type='text'
														placeholder='Enter govt id number'
													/>
													<div className='invalid-feedback'>
														{errors.govt_id_number != undefined
															? errors.govt_id_number[0]
															: null}
													</div>
												</div>
												<div className='col-md-12 mb-3'>
													<label className='small mb-1' htmlFor='status'>
														Status
													</label>
													<select
														className={
															errors.status != undefined
																? 'form-select is-invalid'
																: 'form-select'
														}
														name='status'
														id='status'
														value={input.status}
														onChange={handleInput}
													>
														<option value={1}>Active</option>
														<option value={0}>Inactive</option>
													</select>
													<div className='invalid-feedback'>
														{errors.status != undefined ? errors.status[0] : null}
													</div>
												</div>
												<div className='col-md-12 mb-3'>
													<label className='small mb-1' htmlFor='bio'>
														Bio
													</label>
													<textarea
														className={
															errors.bio != undefined
																? 'form-control is-invalid'
																: 'form-control'
														}
														name='bio'
														id='bio'
														value={input.bio}
														onChange={handleInput}
														placeholder='Enter bio'
														rows='3'
													/>
													<div className='invalid-feedback'>
														{errors.bio != undefined ? errors.bio[0] : null}
													</div>
												</div>
												<div className='col-md-12 mb-3'>
													<label className='small mb-1' htmlFor='photo'>
														Photo
													</label>
													<input
														className={
															errors.photo != undefined
																? 'form-control is-invalid'
																: 'form-control'
														}
														id='photo'
														name='photo'
														type='file'
														onChange={handleLogo}
													/>
													{input.photo != undefined || input.photo == '' ? (
														<div className='row'>
															<div className='col-md-6'>
																<img
																	src={input.photo}
																	alt='Sales Manager Photo'
																	className='img-thumbnail'
																/>
															</div>
														</div>
													) : null}
												</div>
												<div className='col-md-12 mb-3'>
													<label className='small mb-1' htmlFor='govt_id'>
														Govt. Photo ID
													</label>
													<input
														className={
															errors.govt_id != undefined
																? 'form-control is-invalid'
																: 'form-control'
														}
														id='govt_id'
														name='govt_id'
														type='file'
														onChange={handleLogo}
													/>
													{input.govt_id != undefined || input.govt_id == '' ? (
														<div className='row'>
															<div className='col-md-6'>
																<img
																	src={input.govt_id}
																	alt='Govt. ID Photo'
																	className='img-thumbnail'
																/>
															</div>
														</div>
													) : null}
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className='col-md-6 mb-3'>
									<div className='card'>
										<div className='card-header'>
											<h6>Contact Address</h6>
										</div>
										<div className='card-body'>
											<div className='row'>
												<div className='col-md-12'>
													<label className='small mb-1' htmlFor='address'>
														Address
													</label>
													<textarea
														className={
															errors.address != undefined
																? 'form-control is-invalid'
																: 'form-control'
														}
														name='address'
														id='address'
														value={input.address}
														onChange={handleInput}
														placeholder='Enter address'
														rows='3'
													/>
													<div className='invalid-feedback'>
														{errors.address != undefined ? errors.address[0] : null}
													</div>
												</div>
												<div className='col-md-12'>
													<label className='small mb-1' htmlFor='division'>
														Division
													</label>
													<input
														className={
															errors.division != undefined
																? 'form-control is-invalid'
																: 'form-control'
														}
														name='division'
														id='division'
														value={input.division}
														onChange={handleInput}
														type='text'
														placeholder='Enter division name'
													/>
													<div className='invalid-feedback'>
														{errors.division != undefined ? errors.division[0] : null}
													</div>
												</div>
												<div className='col-md-12'>
													<label className='small mb-1' htmlFor='district'>
														District
													</label>
													<input
														className={
															errors.district != undefined
																? 'form-control is-invalid'
																: 'form-control'
														}
														name='district'
														id='district'
														value={input.district}
														onChange={handleInput}
														type='text'
														placeholder='Enter district name'
													/>
													<div className='invalid-feedback'>
														{errors.district != undefined ? errors.district[0] : null}
													</div>
												</div>
												<div className='col-md-12'>
													<label className='small mb-1' htmlFor='area'>
														Area
													</label>
													<input
														className={
															errors.area != undefined
																? 'form-control is-invalid'
																: 'form-control'
														}
														name='area'
														id='area'
														value={input.area}
														onChange={handleInput}
														type='text'
														placeholder='Enter area name'
													/>
													<div className='invalid-feedback'>
														{errors.area != undefined ? errors.area[0] : null}
													</div>
												</div>
												<div className='col-md-12'>
													<label className='small mb-1' htmlFor='land_mark'>
														Land Mark
													</label>
													<input
														className={
															errors.land_mark != undefined
																? 'form-control is-invalid'
																: 'form-control'
														}
														name='land_mark'
														id='land_mark'
														value={input.land_mark}
														onChange={handleInput}
														type='text'
														placeholder='Enter land mark'
													/>
													<div className='invalid-feedback'>
														{errors.land_mark != undefined ? errors.land_mark[0] : null}
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className='card-footer d-flex justify-content-between'>
							<button
								className='btn btn-danger'
								type='button'
								onClick={handleSalesManagerReset}
								dangerouslySetInnerHTML={{
									__html: isLoading
										? '<span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> Loading...'
										: 'Reset',
								}}
							/>
							<button
								className='btn btn-primary'
								type='button'
								onClick={handleSalesManagerAdd}
								dangerouslySetInnerHTML={{
									__html: isLoading
										? '<span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> Loading...'
										: 'Save changes',
								}}
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default SalesManagerAdd;
