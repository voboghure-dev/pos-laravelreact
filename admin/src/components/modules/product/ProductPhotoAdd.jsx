import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Breadcrumb from '../../partials/Breadcrumb';
import Constants from '../../../Constants';
import axios from 'axios';
import Swal from 'sweetalert2';

const ProductPhotoAdd = () => {
	const navigate = useNavigate();
	const fileInput = useRef(null);
	const params = useParams();
	const [photos, setPhotos] = useState({});
	const [errors, setErrors] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [progress, setProgress] = useState(false);

	const handleFileUpload = (e) => {
		let files = e.target.files;
		for (let i = 0; i < files.length; i++) {
			let reader = new FileReader();
			reader.onloadend = () => {
				setPhotos((prevState) => ({
					...prevState,
					[i]: { ...prevState[i], photo: reader.result, ...prevState[i], is_primary: i == 0 ? 1 : 0 },
				}));
			};
			reader.readAsDataURL(files[i]);
		}
	};

	const handleFileUploadField = () => {
		fileInput.current.click();
	};

	const handlePrimaryPhoto = (key) => {
		for (let i = 0; i < Object.keys(photos).length; i++) {
			setPhotos((prevState) => ({
				...prevState,
				[i]: { ...prevState[i], is_primary: key == i ? 1 : 0 },
			}));
		}
	};

	const handlePhotoUpload = () => {
		setIsLoading(true);
		axios
			.post(
				`${Constants.BASE_URL}/photo`,
				{ photos },
				{
					onUploadProgress: (progressEvent) => {
						const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
						setProgress(progress);
					},
					params: {
						productId: params.id,
					},
				}
			)
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
				navigate('/dashboard/product');
			})
			.catch((errors) => {
				setIsLoading(false);
				if (errors.response.status == 422) {
					setErrors(errors.response.data.errors);
				}
			});
	};

	useEffect(() => {
		console.log(photos);
	}, [photos]);

	return (
		<>
			<Breadcrumb title={'Add Product Photo'} />

			<div className='row'>
				<div className='col-md-12'>
					<div className='card'>
						<div className='card-header'>
							<h4>Add Product Photo</h4>
						</div>
						<div className='card-body'>
							<div className='row'>
								<div className='photo-upload-container'>
									<div className='icon' onClick={handleFileUploadField}>
										<i className='fa-solid fa-camera fa-2x'></i>
									</div>
								</div>
								<input
									ref={fileInput}
									id='photo_input'
									type='file'
									multiple={true}
									accept='image/gif, image/jpg, image/jpeg, image/webp'
									className='d-none'
									onChange={handleFileUpload}
								/>
							</div>
							<div className='row'>
								{Object.keys(photos).map((key) => (
									<div className='col-md-2 my-2' key={key}>
										<img
											onClick={() => handlePrimaryPhoto(key)}
											src={photos[key].photo}
											className={
												photos[key].is_primary == 1
													? 'img-thumbnail preview-photo primary-photo'
													: 'img-thumbnail preview-photo'
											}
											alt='photo preview'
										/>
									</div>
								))}
							</div>
						</div>
						<div className='card-footer text-end'>
							<div
								className='progress col-md-12'
								style={{ display: `${progress < 1 ? 'none' : 'block'}` }}
							>
								<div
									className='progress-bar progress-bar-striped progress-bar-animated bg-info'
									style={{ width: `${progress}%` }}
								>{`${progress}%`}</div>
							</div>
							<button
								className='btn btn-primary col-md-2 mt-2'
								disabled={isLoading}
								type='button'
								onClick={handlePhotoUpload}
								dangerouslySetInnerHTML={{
									__html: isLoading
										? '<span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> Loading...'
										: 'Upload Photo',
								}}
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ProductPhotoAdd;
