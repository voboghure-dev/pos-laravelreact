import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../../partials/Breadcrumb';
import Constants from '../../../Constants';
import axios from 'axios';
import Swal from 'sweetalert2';

const BrandAdd = () => {
	const navigate = useNavigate();
	const [input, setInput] = useState({ status: 1 });
	const [errors, setErrors] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const handleInput = (e) => {
		if (e.target.name == 'name') {
			let slug = e.target.value;
			slug = slug.toLowerCase();
			slug = slug.replaceAll(' ', '-');
			setInput((prevState) => ({
				...prevState,
				slug: slug,
			}));
		}

		setInput((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const handleLogo = (e) => {
		let file = e.target.files[0];
		let reader = new FileReader();
		reader.onloadend = () => {
			setInput((prevState) => ({
				...prevState,
				logo: reader.result,
			}));
		};
		reader.readAsDataURL(file);
	};

	const handleBrandAdd = () => {
		setIsLoading(true);
		axios
			.post(`${Constants.BASE_URL}/brand`, input)
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
				navigate('/dashboard/brand');
			})
			.catch((errors) => {
				setIsLoading(false);
				if (errors.response.status == 422) {
					setErrors(errors.response.data.errors);
				}
			});
	};

	return (
		<>
			<Breadcrumb title={'Add Brand'} />

			<div className='row'>
				<div className='col-md-12'>
					<div className='card'>
						<div className='card-header'>
							<h4>Add Brand</h4>
						</div>
						<div className='card-body'>
							<div className='row'>
								<div className='col-md-6 mb-3'>
									<label className='small mb-1' htmlFor='name'>
										Name
									</label>
									<input
										className={
											errors.name != undefined ? 'form-control is-invalid' : 'form-control'
										}
										name='name'
										id='name'
										value={input.name}
										onChange={handleInput}
										type='text'
										placeholder='Enter brand name'
									/>
									<div className='invalid-feedback'>
										{errors.name != undefined ? errors.name[0] : null}
									</div>
								</div>
								<div className='col-md-6 mb-3'>
									<label className='small mb-1' htmlFor='slug'>
										Slug
									</label>
									<input
										className={
											errors.slug != undefined ? 'form-control is-invalid' : 'form-control'
										}
										name='slug'
										id='slug'
										value={input.slug}
										onChange={handleInput}
										type='text'
										placeholder='Enter brand slug'
									/>
									<div className='invalid-feedback'>
										{errors.slug != undefined ? errors.slug[0] : null}
									</div>
								</div>
								<div className='col-md-6 mb-3'>
									<label className='small mb-1' htmlFor='serial'>
										Serial
									</label>
									<input
										className={
											errors.serial != undefined ? 'form-control is-invalid' : 'form-control'
										}
										name='serial'
										id='serial'
										value={input.serial}
										onChange={handleInput}
										type='number'
										placeholder='Enter brand serial'
									/>
									<div className='invalid-feedback'>
										{errors.serial != undefined ? errors.serial[0] : null}
									</div>
								</div>
								<div className='col-md-6 mb-3'>
									<label className='small mb-1' htmlFor='status'>
										Status
									</label>
									<select
										className={
											errors.status != undefined ? 'form-select is-invalid' : 'form-select'
										}
										name='status'
										id='status'
										value={input.status}
										onChange={handleInput}
										placeholder='Enter brand status'
									>
										<option value={1}>Active</option>
										<option value={0}>Inactive</option>
									</select>
									<div className='invalid-feedback'>
										{errors.status != undefined ? errors.status[0] : null}
									</div>
								</div>
								<div className='col-md-6 mb-3'>
									<label className='small mb-1' htmlFor='description'>
										Description
									</label>
									<textarea
										className={
											errors.description != undefined ? 'form-control is-invalid' : 'form-control'
										}
										name='description'
										id='description'
										value={input.description}
										onChange={handleInput}
										placeholder='Enter brand description'
										rows='3'
									/>
									<div className='invalid-feedback'>
										{errors.description != undefined ? errors.description[0] : null}
									</div>
								</div>
								<div className='col-md-6 mb-3'>
									<label className='small mb-1' htmlFor='logo'>
										Logo
									</label>
									<input
										className={
											errors.logo != undefined ? 'form-control is-invalid' : 'form-control'
										}
										id='logo'
										name='logo'
										type='file'
										onChange={handleLogo}
									/>
									{input.logo != undefined ? (
										<div className='row'>
											<div className='col-md-6'>
												<img src={input.logo} alt='Brand logo' className='img-thumbnail' />
											</div>
										</div>
									) : null}
								</div>
							</div>
						</div>
						<div className='card-footer'>
							<button
								className='btn btn-primary'
								type='button'
								onClick={handleBrandAdd}
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

export default BrandAdd;
