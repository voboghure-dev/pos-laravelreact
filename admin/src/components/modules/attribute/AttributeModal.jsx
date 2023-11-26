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
							<td></td>
						</tr>
						<tr>
							<th>Name</th>
							<td></td>
						</tr>
						<tr>
							<th>Phone Number</th>
							<td></td>
						</tr>
					</tbody>
				</table>
			</Modal.Body>
			<Modal.Footer>
				<button type='button' class='btn btn-secondary'>
					Close
				</button>
				<button type='button' class='btn btn-primary'>
					Save Changes
				</button>
			</Modal.Footer>
		</Modal>
	);
};

export default AttributeModal;
