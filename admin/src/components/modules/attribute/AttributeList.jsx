import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../../partials/Breadcrumb';
import Constants from '../../../Constants';
import axios from 'axios';
import Pagination from 'react-js-pagination';
import Swal from 'sweetalert2';
import NoDataFound from '../../partials/NoDataFound';
import AddAttributeModal from './AddAttributeModal';

const AttributeList = () => {
	const [input, setInput] = useState({
		search: '',
		order_by: 'name',
		direction: 'asc',
		per_page: '10',
	});
	const [attributes, setAttributes] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const [attributeModalShow, setAttributeModalShow] = useState(false);

	const [itemsCountPerPage, setItemsCountPerPage] = useState(0);
	const [totalItemsCount, setTotalItemsCount] = useState(1);
	const [startFrom, setStartFrom] = useState(1);
	const [activePage, setActivePage] = useState(1);

	const getAttributes = (pageNumber = 1) => {
		setIsLoading(true);
		axios
			.get(
				`${Constants.BASE_URL}/attribute?page=${pageNumber}&search=${input.search}&order_by=${input.order_by}&per_page=${input.per_page}&direction=${input.direction}`
			)
			.then((res) => {
				setAttributes(res.data.data);
				setItemsCountPerPage(res.data.meta.per_page);
				setTotalItemsCount(res.data.meta.total);
				setStartFrom(res.data.meta.from);
				setActivePage(res.data.meta.current_page);
				setIsLoading(false);
			});
	};

	const handleInput = (e) => {
		setInput((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
	};

	// const handleAttributeDelete = (id) => {
	// 	Swal.fire({
	// 		title: 'Are you sure?',
	// 		text: 'Attribute will be deleted!',
	// 		icon: 'warning',
	// 		showCancelButton: true,
	// 		confirmButtonColor: '#3085d6',
	// 		cancelButtonColor: '#d33',
	// 		confirmButtonText: 'Yes, delete!',
	// 	}).then((result) => {
	// 		if (result.isConfirmed) {
	// 			axios.delete(`${Constants.BASE_URL}/attribute/${id}`).then((res) => {
	// 				getAttributes();
	// 				Swal.fire({
	// 					position: 'top-end',
	// 					icon: res.data.cls,
	// 					title: res.data.msg,
	// 					showConfirmButton: false,
	// 					toast: true,
	// 					timer: 1500,
	// 				});
	// 			});
	// 		}
	// 	});
	// };

	useEffect(() => {
		getAttributes();
	}, []);

	return (
		<>
			<Breadcrumb title={'Attribute List'} />

			<div className='row'>
				<div className='col-md-12'>
					<div className='card mb-4'>
						<div className='card-header d-flex justify-content-between align-items-center'>
							<h4>Attribute List</h4>
							<button onClick={() => setAttributeModalShow(true)} className='btn btn-primary'>
								<i className='fa-solid fa-plus'></i> Add Attribute
							</button>
						</div>
						<div className='card-body'>
							{/* <div className='search-area mb-4'>
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
											className='form-select form-select-sm'
											id='order_by'
											name='order_by'
											value={input.order_by}
											onChange={handleInput}
										>
											<option value={'company_name'}>Company Name</option>
											<option value={'phone_email'}>Phone Number</option>
											<option value={'email_address'}>Email Address</option>
											<option value={'status'}>Status</option>
											<option value={'created_at'}>Created at</option>
											<option value={'updated_at'}>Updated at</option>
										</select>
									</div>
									<div className='col-md-2'>
										<label htmlFor='direction'>Order Direction</label>
										<select
											className='form-select form-select-sm'
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
											className='form-select form-select-sm'
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
												onClick={() => getSuppliers(1)}
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
							</div> */}

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
												<th>Name</th>
												<th>Status</th>
												<th>Created By</th>
												<th>Date & Time</th>
												<th>Action</th>
											</tr>
										</thead>
										<tbody>
											{Object.keys(attributes).length > 0 ? (
												attributes.map((attribute, index) => (
													<tr key={index}>
														<td>{startFrom + index}</td>
														<td>
															<p>{attribute.name}</p>
														</td>
														<td>
															<p>{attribute.status}</p>
														</td>
														<td>
															<p>{attribute.created_by}</p>
														</td>
														<td>
															<p className='text-primary'>{attribute.created_at}</p>
															<p className='text-success'>{attribute.updated_at}</p>
														</td>
														<td className='text-center'>
															<button
																onClick={() => handleDetailsModal(attribute)}
																className='btn btn-sm btn-info'
															>
																<i className='fa-solid fa-eye' />
															</button>
															<Link to={`/dashboard/attribute/edit/${attribute.id}`}>
																<button className='btn btn-sm btn-warning mx-1'>
																	<i className='fa-solid fa-edit' />
																</button>
															</Link>
															<button
																onClick={() => handleSupplierDelete(attribute.id)}
																className='btn btn-sm btn-danger'
															>
																<i className='fa-solid fa-trash' />
															</button>
														</td>
													</tr>
												))
											) : (
												<tr>
													<td colSpan={9}>
														<NoDataFound />
													</td>
												</tr>
											)}
										</tbody>
									</table>
									<AddAttributeModal
										show={attributeModalShow}
										onHide={() => setAttributeModalShow(false)}
										reload={() => getAttributes()}
										// size='lg'
									/>
								</div>
							)}
						</div>
						<div className='card-footer'>
							<nav className='paginate mt-3'>
								{/* <Pagination
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
									onChange={getSuppliers}
								/> */}
							</nav>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default AttributeList;
