import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../../partials/Breadcrumb';
import Constants from '../../../Constants';
import axios from 'axios';
import Pagination from 'react-js-pagination';
import Swal from 'sweetalert2';
import NoDataFound from '../../partials/NoDataFound';

const ProductList = () => {
	const [input, setInput] = useState({
		search: '',
		order_by: 'created_at',
		direction: 'desc',
		per_page: '10',
	});
	const [isLoading, setIsLoading] = useState(false);

	const [products, setProducts] = useState([]);

	const [itemsCountPerPage, setItemsCountPerPage] = useState(0);
	const [totalItemsCount, setTotalItemsCount] = useState(1);
	const [startFrom, setStartFrom] = useState(1);
	const [activePage, setActivePage] = useState(1);

	const getProducts = (pageNumber = 1) => {
		setIsLoading(true);
		axios
			.get(
				`${Constants.BASE_URL}/product?page=${pageNumber}&search=${input.search}&order_by=${input.order_by}&per_page=${input.per_page}&direction=${input.direction}`
			)
			.then((res) => {
				setProducts(res.data.data);
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

	const handleProductDelete = (id) => {
		Swal.fire({
			title: 'Are you sure?',
			text: 'Product will be deleted!',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, delete!',
		}).then((result) => {
			if (result.isConfirmed) {
				axios.delete(`${Constants.BASE_URL}/product/${id}`).then((res) => {
					getProducts();
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
		getProducts();
	}, []);

	return (
		<>
			<Breadcrumb title={'Product List'} />

			<div className='row'>
				<div className='col-md-12'>
					<div className='card mb-4'>
						<div className='card-header'>
							<h4>Product List</h4>
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
												onClick={() => getProducts(1)}
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
												<th>Price details</th>
												<th>Status</th>
												<th>Logo</th>
												<th>Category & Others</th>
												<th>Date & Time</th>
												<th>Action</th>
											</tr>
										</thead>
										<tbody>
											{Object.keys(products).length > 0 ? (
												products.map((product, index) => (
													<tr key={index}>
														<td>{startFrom + index}</td>
														<td>
															<p className='text-primary'>Name: {product.name}</p>
															<p className='text-success'>Slug: {product.slug}</p>
															<div className='text-primary'>
																{product.attributes != undefined &&
																Object.keys(product.attributes).length > 0
																	? product.attributes.map((attribute, index) => (
																			<p key={index}>
																				<small>
																					{attribute.name}: {attribute.value}
																				</small>
																			</p>
																	  ))
																	: null}
															</div>
														</td>
														<td>
															<p className='text-primary'>Cost: {product.cost}</p>
															<p className='text-success'>Price: {product.price}</p>
															<p className='text-secondary'>
																Discount: {product.discount_percent} +{' '}
																{product.discount_fixed}
															</p>
															<p className='text-primary'>
																Discount start: {product.discount_start}
															</p>
															<p className='text-primary'>
																Discount end: {product.discount_end}
															</p>
														</td>
														<td>
															<p className='text-primary'>Status: {product.status}</p>
															<p className='text-success'>SKU: {product.sku}</p>
															<p className='text-secondary'>Stock: {product.stock}</p>
														</td>
														<td>
															<img
																src={product.primary_photo}
																alt={product.name}
																className='img-thumbnail mx-auto d-block list-photo'
															/>
														</td>
														<td>
															<p className='text-primary'>Category: {product.category}</p>
															<p className='text-success'>
																Sub Category: {product.sub_category}
															</p>
															<p className='text-primary'>Brand: {product.brand}</p>
															<p className='text-primary'>Supplier: {product.supplier}</p>
															<p className='text-primary'>Country: {product.country}</p>
														</td>
														<td>
															<p className='text-primary'>{product.created_at}</p>
															<p className='text-primary'>{product.created_by_user}</p>
															<p className='text-success'>{product.updated_at}</p>
															<p className='text-success'>{product.updated_by_user}</p>
														</td>
														<td className='text-center'>
															<button className='btn btn-sm btn-info'>
																<i className='fa-solid fa-eye' />
															</button>
															<Link to={`/dashboard/product/edit/${product.id}`}>
																<button className='btn btn-sm btn-warning mx-1'>
																	<i className='fa-solid fa-edit' />
																</button>
															</Link>
															<button
																onClick={() => handleProductDelete(product.id)}
																className='btn btn-sm btn-danger'
															>
																<i className='fa-solid fa-trash' />
															</button>
														</td>
													</tr>
												))
											) : (
												<tr>
													<td colSpan={7}>
														<NoDataFound />
													</td>
												</tr>
											)}
										</tbody>
									</table>
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
									onChange={getProducts}
								/>
							</nav>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ProductList;
