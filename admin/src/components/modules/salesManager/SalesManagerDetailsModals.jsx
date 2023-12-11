import Modal from 'react-bootstrap/Modal';

const SalesManagerDetailsModals = (props) => {
	return (
		<Modal {...props} size={props.size} aria-labelledby='brand-details-modal' centered>
			<Modal.Header closeButton>
				<Modal.Title id='brand-details-modal'>{props.title}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<table className='my-table table table-hover table-striped table-bordered'>
					<tbody>
						<tr>
							<th>ID</th>
							<td>{props.details.id}</td>
						</tr>
						<tr>
							<th>Name</th>
							<td>{props.details.name}</td>
						</tr>
						<tr>
							<th>Phone Number</th>
							<td>{props.details.phone}</td>
						</tr>
						<tr>
							<th>Email Address</th>
							<td>{props.details.email}</td>
						</tr>
						<tr>
							<th>Bio</th>
							<td>{props.details.bio}</td>
						</tr>
						<tr>
							<th>Address</th>
							<td>{props.details?.address?.address}</td>
						</tr>
						<tr>
							<th>Division</th>
							<td>{props.details?.address?.division}</td>
						</tr>
						<tr>
							<th>District</th>
							<td>{props.details?.address?.district}</td>
						</tr>
						<tr>
							<th>Area</th>
							<td>{props.details?.address?.area}</td>
						</tr>
						<tr>
							<th>Land Mark</th>
							<td>{props.details?.address?.land_mark}</td>
						</tr>
						<tr>
							<th>Status</th>
							<td>{props.details.status}</td>
						</tr>
						<tr>
							<th>Created By</th>
							<td>{props.details.created_by}</td>
						</tr>
						<tr>
							<th>Created at</th>
							<td>{props.details.created_at}</td>
						</tr>
						<tr>
							<th>Updated at</th>
							<td>{props.details.updated_at}</td>
						</tr>
						<tr>
							<th>Photo</th>
							<td>
								<img
									src={props.details.photo_thumb}
									alt={props.details.name}
									className='img-thumbnail category-photo'
								/>
							</td>
						</tr>
					</tbody>
				</table>
			</Modal.Body>
		</Modal>
	);
};

export default SalesManagerDetailsModals;
