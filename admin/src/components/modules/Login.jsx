import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/img/logo.png';
import { useState } from 'react';
import axios from 'axios';
import Constants from '../../Constants';

const Login = () => {
	const navigate = useNavigate();
	const [input, setInput] = useState({ role: 1 });
	const [errors, setErrors] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const handleKeyPress = (e) => {
		if (e.key === 'Enter') {
			handleLogin();
		}
	};

	const handleInput = (e) => {
		setInput((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
	};

	const handleLogin = () => {
		setIsLoading(true);
		axios
			.post(`${Constants.BASE_URL}/login`, input)
			.then((res) => {
				localStorage.email = res.data.email;
				localStorage.name = res.data.name;
				localStorage.phone = res.data.phone;
				localStorage.photo = res.data.photo;
				localStorage.role = res.data.role;
				localStorage.token = res.data.token;
				setIsLoading(false);
				navigate('/dashboard');
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
			<Helmet>
				<title>Login | My POS</title>
			</Helmet>

			<div id='layoutAuthentication' className='bg-gray'>
				<div id='layoutAuthentication_content'>
					<main>
						<div className='container mt-5'>
							<div className='row justify-content-center'>
								<div className='col-lg-5'>
									<img src={logo} alt='ERPOnline Logo' className='my-2 w-50 mx-auto d-flex' />

									<div className='card shadow-lg border-0 rounded-lg mt-5'>
										<div className='card-header'>
											<h3 className='text-center font-weight-light my-4'>Login</h3>
										</div>
										<div className='card-body'>
											<div className='form-floating mb-3'>
												<input
													className={
														errors.email_or_phone != undefined
															? 'form-control is-invalid'
															: 'form-control'
													}
													id='email_or_phone'
													type='text'
													name='email_or_phone'
													value={input.email_or_phone || ''}
													onChange={handleInput}
													placeholder=''
												/>
												<label htmlFor='email_or_phone'>Email or Phone Number</label>
												<div className='invalid-feedback'>
													{errors.email_or_phone != undefined
														? errors.email_or_phone[0]
														: null}
												</div>
											</div>
											<div className='form-floating mb-3'>
												<input
													className={
														errors.password != undefined
															? 'form-control is-invalid'
															: 'form-control'
													}
													id='password'
													type='password'
													name='password'
													value={input.password || ''}
													onChange={handleInput}
													onKeyDown={handleKeyPress}
													placeholder=''
												/>
												<label htmlFor='password'>Password</label>
												<div className='invalid-feedback'>
													{errors.password != undefined ? errors.password[0] : null}
												</div>
											</div>
											<div className='form-floating mb-3'>
												<select
													className={
														errors.role != undefined
															? 'form-select is-invalid'
															: 'form-select'
													}
													id='role'
													name='role'
													value={input.role || ''}
													onChange={handleInput}
												>
													<option value={1}>Admin</option>
													<option value={2}>Sales Manager</option>
												</select>
												<label htmlFor='role'>User Role</label>
												<div className='invalid-feedback'>
													{errors.role != undefined ? errors.role[0] : null}
												</div>
											</div>
											<div className='form-check mb-3'>
												<input
													className='form-check-input'
													id='remember-password'
													type='checkbox'
													value=''
												/>
												<label className='form-check-label' htmlFor='remember-password'>
													Remember Password
												</label>
											</div>
										</div>
										<div className='card-footer text-center py-3'>
											<div className='d-flex align-items-center justify-content-between my-1'>
												<a className='small' href='password.html'>
													Forgot Password?
												</a>
												<button
													onClick={handleLogin}
													className='btn btn-primary'
													dangerouslySetInnerHTML={{
														__html: isLoading
															? '<span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> Login...'
															: 'Login',
													}}
												/>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</main>
				</div>
			</div>
		</>
	);
};

export default Login;
