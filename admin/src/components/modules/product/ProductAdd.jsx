import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../../partials/Breadcrumb';
import Constants from '../../../Constants';
import axios from 'axios';
import Swal from 'sweetalert2';

const ProductAdd = () => {
	const navigate = useNavigate();
	const [input, setInput] = useState({ status: 1 });
	const [errors, setErrors] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const [categories, setCategories] = useState([]);
	const [subCategories, setSubCategories] = useState([]);
	const [brands, setBrands] = useState([]);
	const [suppliers, setSuppliers] = useState([]);
	const [countries, setCountries] = useState([]);

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

	const getSubCategories = (category_id) => {
		axios
			.get(`${Constants.BASE_URL}/get-sub-category-list/${category_id}`)
			.then((res) => {
				setSubCategories(res.data);
			})
			.catch((errors) => {
				if (errors.response.status == 422) {
					setErrors(errors.response.data.errors);
				}
			});
	};

	const getBrands = () => {
		axios
			.get(`${Constants.BASE_URL}/get-brand-list`)
			.then((res) => {
				setBrands(res.data);
			})
			.catch((errors) => {
				if (errors.response.status == 422) {
					setErrors(errors.response.data.errors);
				}
			});
	};

	const getCountries = () => {
		axios
			.get(`${Constants.BASE_URL}/get-country-list`)
			.then((res) => {
				setCountries(res.data);
			})
			.catch((errors) => {
				if (errors.response.status == 422) {
					setErrors(errors.response.data.errors);
				}
			});
	};

	const getSuppliers = () => {
		axios
			.get(`${Constants.BASE_URL}/get-supplier-list`)
			.then((res) => {
				setSuppliers(res.data);
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
		} else if (e.target.name == 'category_id') {
			let category_id = parseInt(e.target.value);
			if (!Number.isNaN(category_id)) {
				getSubCategories(e.target.value);
			}
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

	const handleCategoryAdd = () => {
		setIsLoading(true);
		axios
			.post(`${Constants.BASE_URL}/category`, input)
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
				navigate('/dashboard/category');
			})
			.catch((errors) => {
				setIsLoading(false);
				if (errors.response.status == 422) {
					setErrors(errors.response.data.errors);
				}
			});
	};

	useEffect(() => {
		getCategories();
		getBrands();
		getCountries();
		getSuppliers();
	}, []);

	return (
		<>
			<Breadcrumb title={'Add Product'} />

			<div className='row'>
				<div className='col-md-12'>
					<div className='card'>
						<div className='card-header'>
							<h4>Add Product</h4>
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
										placeholder='Enter category name'
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
										placeholder='Enter category slug'
									/>
									<div className='invalid-feedback'>
										{errors.slug != undefined ? errors.slug[0] : null}
									</div>
								</div>
								<div className='col-md-6 mb-3'>
									<label className='small mb-1' htmlFor='category_id'>
										Category
									</label>
									<select
										className={
											errors.category_id != undefined ? 'form-select is-invalid' : 'form-select'
										}
										name='category_id'
										id='category_id'
										value={input.category_id}
										onChange={handleInput}
									>
										<option>Select Category</option>
										{categories.map((category, index) => (
											<option value={category.id} key={index}>
												{category.name}
											</option>
										))}
									</select>
									<div className='invalid-feedback'>
										{errors.category_id != undefined ? errors.category_id[0] : null}
									</div>
								</div>
								<div className='col-md-6 mb-3'>
									<label className='small mb-1' htmlFor='sub_category_id'>
										Sub Category
									</label>
									<select
										className={
											errors.sub_category_id != undefined
												? 'form-select is-invalid'
												: 'form-select'
										}
										name='sub_category_id'
										id='sub_category_id'
										value={input.sub_category_id}
										onChange={handleInput}
										disabled={input.category_id == undefined}
									>
										<option>Select Sub Category</option>
										{subCategories.map((subCategory, index) => (
											<option value={subCategory.id} key={index}>
												{subCategory.name}
											</option>
										))}
									</select>
									<div className='invalid-feedback'>
										{errors.sub_category_id != undefined ? errors.sub_category_id[0] : null}
									</div>
								</div>
								<div className='col-md-6 mb-3'>
									<label className='small mb-1' htmlFor='brand_id'>
										Brand
									</label>
									<select
										className={
											errors.brand_id != undefined ? 'form-select is-invalid' : 'form-select'
										}
										name='brand_id'
										id='brand_id'
										value={input.brand_id}
										onChange={handleInput}
									>
										<option>Select Category</option>
										{brands.map((brand, index) => (
											<option value={brand.id} key={index}>
												{brand.name}
											</option>
										))}
									</select>
									<div className='invalid-feedback'>
										{errors.brand_id != undefined ? errors.brand_id[0] : null}
									</div>
								</div>
								<div className='col-md-6 mb-3'>
									<label className='small mb-1' htmlFor='country_id'>
										Select product origin
									</label>
									<select
										className={
											errors.country_id != undefined ? 'form-select is-invalid' : 'form-select'
										}
										name='country_id'
										id='country_id'
										value={input.country_id}
										onChange={handleInput}
									>
										<option>Select Country</option>
										{countries.map((country, index) => (
											<option value={country.id} key={index}>
												{country.name}
											</option>
										))}
									</select>
									<div className='invalid-feedback'>
										{errors.country_id != undefined ? errors.country_id[0] : null}
									</div>
								</div>
								<div className='col-md-6 mb-3'>
									<label className='small mb-1' htmlFor='supplier_id'>
										Select supplier
									</label>
									<select
										className={
											errors.supplier_id != undefined ? 'form-select is-invalid' : 'form-select'
										}
										name='supplier_id'
										id='supplier_id'
										value={input.supplier_id}
										onChange={handleInput}
									>
										<option>Select Supplier</option>
										{suppliers.map((supplier, index) => (
											<option value={supplier.id} key={index}>
												{supplier.company_name}
											</option>
										))}
									</select>
									<div className='invalid-feedback'>
										{errors.supplier_id != undefined ? errors.supplier_id[0] : null}
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
										placeholder='Enter category description'
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
									{input.photo != undefined ? (
										<div className='row'>
											<div className='col-md-6'>
												<img src={input.photo} alt='Category photo' className='img-thumbnail' />
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
								onClick={handleCategoryAdd}
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

export default ProductAdd;
