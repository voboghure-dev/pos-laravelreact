import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../../partials/Breadcrumb';
import Constants from '../../../Constants';
import axios from 'axios';
import Swal from 'sweetalert2';

const ProductAdd = () => {
	const navigate = useNavigate();
	const [input, setInput] = useState({ status: 1 });
	const [attribute_input, setAttribute_input] = useState({});
	const [errors, setErrors] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const [categories, setCategories] = useState([]);
	const [subCategories, setSubCategories] = useState([]);
	const [brands, setBrands] = useState([]);
	const [countries, setCountries] = useState([]);
	const [suppliers, setSuppliers] = useState([]);
	const [attributes, setAttributes] = useState([]);
	const [attributeField, setAttributeField] = useState([]);
	const [attributeFieldId, setAttributeFieldId] = useState(1);

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

	const getAttributes = () => {
		axios
			.get(`${Constants.BASE_URL}/get-attribute-list`)
			.then((res) => {
				setAttributes(res.data);
			})
			.catch((errors) => {
				if (errors.response.status == 422) {
					setErrors(errors.response.data.errors);
				}
			});
	};

	const handleAttributeField = (id) => {
		if (attributes.length >= attributeFieldId) {
			setAttributeFieldId(attributeFieldId + 1);
			setAttributeField((prevState) => [...prevState, attributeFieldId]);
		}
	};

	const handleAttributeFieldRemove = (id) => {
		setAttributeField((oldValues) => {
			return oldValues.filter((attributeFiled) => attributeFiled !== id);
		});
		setAttribute_input((current) => {
			const copy = { ...current };
			delete copy[id];
			return copy;
		});
		setAttributeFieldId(attributeFieldId - 1);
	};

	const handleAttributeInput = (e, id) => {
		setAttribute_input((prevState) => ({
			...prevState,
			[id]: {
				...prevState[id],
				[e.target.name]: e.target.value,
			},
		}));
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
		setInput((prevState) => ({ ...prevState, attributes: attribute_input }));
	}, [attribute_input]);

	useEffect(() => {
		getCategories();
		getBrands();
		getCountries();
		getSuppliers();
		getAttributes();
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
								<div className='col-md-12 mb-3'>
									<div className='card'>
										<div className='card-header'>
											<h5>Select Product Attributes</h5>
										</div>
										<div className='card-body'>
											{attributeField.map((attrFieldId, attrFieldIndex) => (
												<div key={attrFieldIndex} className='row align-items-end'>
													<div className='col-md-5'>
														<label className='small mb-1' htmlFor='attribute_id'>
															Select Attribute
														</label>
														<select
															className='form-select'
															name='attribute_id'
															id='attribute_id'
															value={
																attribute_input[attrFieldId] != undefined
																	? attribute_input[attrFieldId].attribute_id
																	: ''
															}
															onChange={(e) => handleAttributeInput(e, attrFieldId)}
														>
															<option>Select Attribute</option>
															{attributes.map((attr, index) => (
																<option value={attr.id} key={index}>
																	{attr.name}
																</option>
															))}
														</select>
														<div className='invalid-feedback'>
															{errors.attribute_id != undefined
																? errors.attribute_id[0]
																: null}
														</div>
													</div>
													<div className='col-md-5'>
														<label className='small mb-1' htmlFor='value_id'>
															Select Attribute Value
														</label>
														<select
															className='form-select'
															name='value_id'
															id='value_id'
															value={input.value_id}
															onChange={handleInput}
														>
															<option>Select Attribute Value</option>
															{attributes.map((attr, index) => (
																<>
																	{attribute_input[attrFieldId] != undefined &&
																	attr.id == attribute_input[attrFieldId].attribute_id
																		? attr.value.map((attr_value, value_index) => (
																				<option
																					key={value_index}
																					value={attr_value.id}
																				>
																					{attr_value.name}
																				</option>
																		  ))
																		: null}
																</>
															))}
														</select>
														<div className='invalid-feedback'>
															{errors.value_id != undefined ? errors.value_id[0] : null}
														</div>
													</div>
													<div className='col-md-2'>
														<button
															className='btn btn-sm btn-danger mb-1'
															onClick={() => handleAttributeFieldRemove(attrFieldId)}
														>
															<i className='fa-solid fa-minus' />
														</button>
													</div>
												</div>
											))}

											<div className='row mt-3'>
												<div className='col-md-12 text-center'>
													<button
														className={'btn btn-success'}
														onClick={handleAttributeField}
													>
														<i className='fa-solid fa-plus' />
													</button>
												</div>
											</div>
										</div>
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