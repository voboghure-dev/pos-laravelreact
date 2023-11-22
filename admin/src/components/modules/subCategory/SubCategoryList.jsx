import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../../partials/Breadcrumb';
import Constants from '../../../Constants';
import axios from 'axios';
import Pagination from 'react-js-pagination';
import Swal from 'sweetalert2';
import NoDataFound from '../../partials/NoDataFound';
import SubCategoryDetailsModals from './SubCategoryDetailsModals';
import PhotoModals from '../../partials/PhotoModals';

const SubCategoryList = () => {
	const [input, setInput] = useState({
		search: '',
		order_by: 'serial',
		direction: 'asc',
		per_page: '10',
	});
	const [isLoading, setIsLoading] = useState(false);

	const [photoModalShow, setPhotoModalShow] = useState(false);
	const [modalPhoto, setModalPhoto] = useState('');

	const [subCategoryModalShow, setSubCategoryModalShow] = useState(false);
	const [modalDetails, setModalDetails] = useState('');

	const [subCategories, setSubCategories] = useState([]);

	const [itemsCountPerPage, setItemsCountPerPage] = useState(0);
	const [totalItemsCount, setTotalItemsCount] = useState(1);
	const [startFrom, setStartFrom] = useState(1);
	const [activePage, setActivePage] = useState(1);

	const getSubCategories = (pageNumber = 1) => {
		setIsLoading(true);
		axios
			.get(
				`${Constants.BASE_URL}/sub-category?page=${pageNumber}&search=${input.search}&order_by=${input.order_by}&per_page=${input.per_page}&direction=${input.direction}`
			)
			.then((res) => {
				setSubCategories(res.data.data);
				setItemsCountPerPage(res.data.meta.per_page);
				setTotalItemsCount(res.data.meta.total);
				setStartFrom(res.data.meta.from);
				setActivePage(res.data.meta.current_page);
				setIsLoading(false);
			});
	};

	const handlePhotoModal = (photo) => {
		setPhotoModalShow(true);
		setModalPhoto(photo);
	};

	const handleDetailsModal = (category) => {
		setSubCategoryModalShow(true);
		setModalDetails(category);
	};

	const handleInput = (e) => {
		setInput((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const handleSubCategoryDelete = (id) => {
		Swal.fire({
			title: 'Are you sure?',
			text: 'Sub Category will be deleted!',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, delete!',
		}).then((result) => {
			if (result.isConfirmed) {
				axios.delete(`${Constants.BASE_URL}/sub-category/${id}`).then((res) => {
					getSubCategories();
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

	useEffect(() => {
		getSubCategories();
	}, []);

	return (
		<>
			<Breadcrumb title={'Sub Category List'} />

			<div className='row'>
				<div className='col-md-12'>
					<div className='card mb-4'>
						<div className='card-header'>
							<h4>Sub Category List</h4>
						</div>
						<div className='card-body'>
							<div className='search-area mb-4'>
								<div className='row'>
									<div className='col-md-3'>
										<label htmlFor='search'>Search</label>
										<input
											className='form-control form-control-sm'
											id='search'
											type='search'
											name='search'
											onChange={handleInput}
											placeholder='Search...'
										/>
									</div>
									<div className='col-md-3'>
										<label htmlFor='order_by'>Order By</label>
										<select
											className='form-control form-control-sm'
											id='order_by'
											name='order_by'
											value={input.order_by}
											onChange={handleInput}
										>
											<option value={'name'}>Name</option>
											<option value={'created_at'}>Created at</option>
											<option value={'updated_at'}>Updated at</option>
											<option value={'serial'}>Serial</option>
											<option value={'status'}>Status</option>
										</select>
									</div>
									<div className='col-md-2'>
										<label htmlFor='direction'>Order Direction</label>
										<select
											className='form-control form-control-sm'
											id='direction'
											name='direction'
											value={input.direction}
											onChange={handleInput}
										>
											<option value={'asc'}>ASC</option>
											<option value={'desc'}>DESC</option>
										</select>
									</div>
									<div className='col-md-2'>
										<label htmlFor='per_page'>Per Page</label>
										<select
											className='form-control form-control-sm'
											id='per_page'
											name='per_page'
											value={input.per_page}
											onChange={handleInput}
										>
											<option value={10}>10</option>
											<option value={25}>25</option>
											<option value={50}>50</option>
											<option value={100}>100</option>
										</select>
									</div>
									<div className='col-md-2'>
										<div className='d-grid mt-4'>
											<button
												onClick={() => getSubCategories(1)}
												className='btn btn-sm btn-primary'
												dangerouslySetInnerHTML={{
													__html: isLoading
														? '<span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> Loading...'
														: 'Search',
												}}
											/>
										</div>
									</div>
								</div>
							</div>

							{isLoading ? (
								<div className='d-flex justify-content-center'>
									<div className='spinner-border' role='status'>
										<span className='visually-hidden'>Loading...</span>
									</div>
								</div>
							) : (
								<div className='table-responsive'>
									<table className='my-table table table-hover table-striped table-bordered'>
										<thead>
											<tr>
												<th>Sl</th>
												<th>Name / Slug</th>
												<th>Category</th>
												<th>Serial / Status</th>
												<th>Photo</th>
												<th>Created By</th>
												<th>Date & Time</th>
												<th>Action</th>
											</tr>
										</thead>
										<tbody>
											{Object.keys(subCategories).length > 0 ? (
												subCategories.map((subCategory, index) => (
													<tr key={index}>
														<td>{startFrom + index}</td>
														<td>
															<p className='text-primary'>Name: {subCategory.name}</p>
															<p className='text-success'>Slug: {subCategory.slug}</p>
														</td>
														<td>{subCategory.category}</td>
														<td>
															<p className='text-primary'>Serial: {subCategory.serial}</p>
															<p className='text-success'>Status: {subCategory.status}</p>
														</td>
														<td>
															<img
																onClick={() => handlePhotoModal(subCategory.photo)}
																src={subCategory.photo_thumb}
																alt={subCategory.name}
																className='img-thumbnail mx-auto d-block category-photo'
															/>
														</td>
														<td>
															<p>{subCategory.created_by}</p>
														</td>
														<td>
															<p className='text-primary'>{subCategory.created_at}</p>
															<p className='text-success'>{subCategory.updated_at}</p>
														</td>
														<td className='text-center'>
															<button
																onClick={() => handleDetailsModal(subCategory)}
																className='btn btn-sm btn-info'
															>
																<i className='fa-solid fa-eye' />
															</button>
															<Link to={`/dashboard/sub-category/edit/${subCategory.id}`}>
																<button className='btn btn-sm btn-warning mx-1'>
																	<i className='fa-solid fa-edit' />
																</button>
															</Link>
															<button
																onClick={() => handleSubCategoryDelete(subCategory.id)}
																className='btn btn-sm btn-danger'
															>
																<i className='fa-solid fa-trash' />
															</button>
														</td>
													</tr>
												))
											) : (
												<tr>
													<td colSpan={8}>
														<NoDataFound />
													</td>
												</tr>
											)}
										</tbody>
									</table>
									<PhotoModals
										show={photoModalShow}
										onHide={() => setPhotoModalShow(false)}
										title='Sub Category Photo'
										size=''
										photo={modalPhoto}
									/>
									<SubCategoryDetailsModals
										show={subCategoryModalShow}
										onHide={() => setSubCategoryModalShow(false)}
										title='Category Details'
										size=''
										details={modalDetails}
									/>
								</div>
							)}
						</div>
						<div className='card-footer'>
							<nav className='paginate mt-3'>
								<Pagination
									activePage={activePage}
									itemsCountPerPage={itemsCountPerPage}
									totalItemsCount={totalItemsCount}
									pageRangeDisplayed={5}
									itemClass={'page-item'}
									linkClass={'page-link'}
									prevPageText={'Previous'}
									firstPageText={'First'}
									lastPageText={'Last'}
									nextPageText={'Next'}
									onChange={getSubCategories}
								/>
							</nav>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default SubCategoryList;
