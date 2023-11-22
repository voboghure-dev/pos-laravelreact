import { Link } from 'react-router-dom';

const Sidebar = () => {
	return (
		<div id='layoutSidenav_nav'>
			<nav className='sb-sidenav accordion sb-sidenav-dark' id='sidenavAccordion'>
				<div className='sb-sidenav-menu'>
					<div className='nav'>
						<div className='sb-sidenav-menu-heading'>Core</div>
						<Link className='nav-link' to='/dashboard'>
							<div className='sb-nav-link-icon'>
								<i className='fas fa-tachometer-alt'></i>
							</div>
							Dashboard
						</Link>
						<div className='sb-sidenav-menu-heading'>Management</div>

						<a
							className='nav-link collapsed'
							href='#'
							data-bs-toggle='collapse'
							data-bs-target='#categoryMenu'
							aria-expanded='false'
							aria-controls='categoryMenu'
						>
							<div className='sb-nav-link-icon'>
								<i className='fas fa-columns'></i>
							</div>
							Category
							<div className='sb-sidenav-collapse-arrow'>
								<i className='fas fa-angle-down'></i>
							</div>
						</a>
						<div
							className='collapse'
							id='categoryMenu'
							aria-labelledby='headingOne'
							data-bs-parent='#sidenavAccordion'
						>
							<nav className='sb-sidenav-menu-nested nav'>
								<Link className='nav-link' to='/dashboard/category/create'>
									Add Category
								</Link>
								<Link className='nav-link' to='/dashboard/category'>
									Category List
								</Link>
							</nav>
						</div>

						<a
							className='nav-link collapsed'
							href='#'
							data-bs-toggle='collapse'
							data-bs-target='#subCategoryMenu'
							aria-expanded='false'
							aria-controls='subCategoryMenu'
						>
							<div className='sb-nav-link-icon'>
								<i className='fas fa-columns'></i>
							</div>
							Sub Category
							<div className='sb-sidenav-collapse-arrow'>
								<i className='fas fa-angle-down'></i>
							</div>
						</a>
						<div
							className='collapse'
							id='subCategoryMenu'
							aria-labelledby='headingOne'
							data-bs-parent='#sidenavAccordion'
						>
							<nav className='sb-sidenav-menu-nested nav'>
								<Link className='nav-link' to='/dashboard/sub-category/create'>
									Add Sub Category
								</Link>
								<Link className='nav-link' to='/dashboard/sub-category'>
									Sub Category List
								</Link>
							</nav>
						</div>

						<a
							className='nav-link collapsed'
							href='#'
							data-bs-toggle='collapse'
							data-bs-target='#brandMenu'
							aria-expanded='false'
							aria-controls='brandMenu'
						>
							<div className='sb-nav-link-icon'>
								<i className='fas fa-columns'></i>
							</div>
							Brand
							<div className='sb-sidenav-collapse-arrow'>
								<i className='fas fa-angle-down'></i>
							</div>
						</a>
						<div
							className='collapse'
							id='brandMenu'
							aria-labelledby='headingOne'
							data-bs-parent='#sidenavAccordion'
						>
							<nav className='sb-sidenav-menu-nested nav'>
								<Link className='nav-link' to='/dashboard/brand/create'>
									Add Brand
								</Link>
								<Link className='nav-link' to='/dashboard/brand'>
									Brand List
								</Link>
							</nav>
						</div>

						<a
							className='nav-link collapsed'
							href='#'
							data-bs-toggle='collapse'
							data-bs-target='#collapsePages'
							aria-expanded='false'
							aria-controls='collapsePages'
						>
							<div className='sb-nav-link-icon'>
								<i className='fas fa-book-open'></i>
							</div>
							Pages
							<div className='sb-sidenav-collapse-arrow'>
								<i className='fas fa-angle-down'></i>
							</div>
						</a>
						<div
							className='collapse'
							id='collapsePages'
							aria-labelledby='headingTwo'
							data-bs-parent='#sidenavAccordion'
						>
							<nav className='sb-sidenav-menu-nested nav accordion' id='sidenavAccordionPages'>
								<a
									className='nav-link collapsed'
									href='#'
									data-bs-toggle='collapse'
									data-bs-target='#pagesCollapseAuth'
									aria-expanded='false'
									aria-controls='pagesCollapseAuth'
								>
									Authentication
									<div className='sb-sidenav-collapse-arrow'>
										<i className='fas fa-angle-down'></i>
									</div>
								</a>
								<div
									className='collapse'
									id='pagesCollapseAuth'
									aria-labelledby='headingOne'
									data-bs-parent='#sidenavAccordionPages'
								>
									<nav className='sb-sidenav-menu-nested nav'>
										<a className='nav-link' href='login.html'>
											Login
										</a>
										<a className='nav-link' href='register.html'>
											Register
										</a>
										<a className='nav-link' href='password.html'>
											Forgot Password
										</a>
									</nav>
								</div>
								<a
									className='nav-link collapsed'
									href='#'
									data-bs-toggle='collapse'
									data-bs-target='#pagesCollapseError'
									aria-expanded='false'
									aria-controls='pagesCollapseError'
								>
									Error
									<div className='sb-sidenav-collapse-arrow'>
										<i className='fas fa-angle-down'></i>
									</div>
								</a>
								<div
									className='collapse'
									id='pagesCollapseError'
									aria-labelledby='headingOne'
									data-bs-parent='#sidenavAccordionPages'
								>
									<nav className='sb-sidenav-menu-nested nav'>
										<a className='nav-link' href='401.html'>
											401 Page
										</a>
										<a className='nav-link' href='404.html'>
											404 Page
										</a>
										<a className='nav-link' href='500.html'>
											500 Page
										</a>
									</nav>
								</div>
							</nav>
						</div>
						<div className='sb-sidenav-menu-heading'>Addons</div>
						<a className='nav-link' href='charts.html'>
							<div className='sb-nav-link-icon'>
								<i className='fas fa-chart-area'></i>
							</div>
							Charts
						</a>
						<a className='nav-link' href='tables.html'>
							<div className='sb-nav-link-icon'>
								<i className='fas fa-table'></i>
							</div>
							Tables
						</a>
					</div>
				</div>
				<div className='sb-sidenav-footer'>
					<div className='small'>Logged in as:</div>
					{localStorage.name != undefined ? localStorage.name : null}
				</div>
			</nav>
		</div>
	);
};

export default Sidebar;
