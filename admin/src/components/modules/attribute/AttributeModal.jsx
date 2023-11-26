import Modal from 'react-bootstrap/Modal';

const AttributeModal = (props) => {
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
							<td>{props.details.company_name}</td>
						</tr>
						<tr>
							<th>Phone Number</th>
							<td>{props.details.phone_number}</td>
						</tr>
					</tbody>
				</table>
			</Modal.Body>
			<Modal.Footer>
				<Button variant='secondary'>Close</Button>
				<Button variant='primary'>Save changes</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default AttributeModal;
