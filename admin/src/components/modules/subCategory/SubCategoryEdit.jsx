import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Breadcrumb from '../../partials/Breadcrumb';
import Constants from '../../../Constants';
import axios from 'axios';
import Swal from 'sweetalert2';

const SubCategoryEdit = () => {
	const params = useParams();
	const navigate = useNavigate();

	const [input, setInput] = useState({});
	const [errors, setErrors] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [categories, setCategories] = useState([]);

	const getCategory = () => {
		axios.get(`${Constants.BASE_URL}/sub-category/${params.id}`).then((res) => {
			setInput(res.data.data);
		});
	};

	const getCategories = () => {
		axios
			.get(`${Constants.BASE_URL}/get-category-list`)
			.then((res) => {
				setCategories(res.data);
			})
			.catch((errors) => {
				if (errors.response.status == 422) {
					setErrors(errors.response.data.errors);
				}
			});
	};

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

	const handlePhoto = (e) => {
		let file = e.target.files[0];
		let reader = new FileReader();
		reader.onloadend = () => {
			setInput((prevState) => ({
				...prevState,
				photo: reader.result,
			}));
		};
		reader.readAsDataURL(file);
	};

	const handleSubCategoryEdit = () => {
		setIsLoading(true);
		axios
			.put(`${Constants.BASE_URL}/sub-category/${params.id}`, input)
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
				navigate('/dashboard/sub-category');
			})
			.catch((errors) => {
				setIsLoading(false);
				if (errors.response.status == 422) {
					setErrors(errors.response.data.errors);
				}
			});
	};

	useEffect(() => {
		getCategory();
		getCategories();
	}, []);

	return (
		<>
			<Breadcrumb title={'Edit Sub Category'} />

			<div className='row'>
				<div className='col-md-12'>
					<div className='card'>
						<div className='card-header'>
							<h4>Edit Sub Category</h4>
						</div>
						<div className='card-body'>
							<div className='row'>
								<div className='col-md-6 mb-3'>
									<label className='small mb-1' htmlFor='status'>
										Select Category
									</label>
									<select
										className={
											errors.category_id != undefined ? 'form-control is-invalid' : 'form-control'
										}
										name='category_id'
										id='category_id'
										value={input.category_id}
										onChange={handleInput}
										placeholder='Select category name'
									>
										<option value=''>Select Category</option>
										{categories.map((category, index) => (
											<option key={index} value={category.id}>
												{category.name}
											</option>
										))}
									</select>
									<div className='invalid-feedback'>
										{errors.category_id != undefined ? errors.category_id[0] : null}
									</div>
								</div>
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
										value={input.name || ''}
										onChange={handleInput}
										type='text'
										placeholder='Enter sub category name'
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
										value={input.slug || ''}
										onChange={handleInput}
										type='text'
										placeholder='Enter sub category slug'
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
										value={input.serial || ''}
										onChange={handleInput}
										type='number'
										placeholder='Enter sub category serial'
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
										value={input.status || 0}
										onChange={handleInput}
										placeholder='Enter sub category status'
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
										value={input.description || ''}
										onChange={handleInput}
										placeholder='Enter sub category description'
										rows='3'
									/>
									<div className='invalid-feedback'>
										{errors.description != undefined ? errors.description[0] : null}
									</div>
								</div>
								<div className='col-md-6 mb-3'>
									<label className='small mb-1' htmlFor='photo'>
										Photo
									</label>
									<input
										className={
											errors.photo != undefined ? 'form-control is-invalid' : 'form-control'
										}
										id='photo'
										name='photo'
										onChange={handlePhoto}
										type='file'
									/>
									{input.photo != undefined || input.existing_photo ? (
										<div className='row'>
											<div className='col-md-6'>
												<img
													src={input.photo != undefined ? input.photo : input.existing_photo}
													alt='Sub category photo'
													className='img-thumbnail'
												/>
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
								onClick={handleSubCategoryEdit}
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

export default SubCategoryEdit;
