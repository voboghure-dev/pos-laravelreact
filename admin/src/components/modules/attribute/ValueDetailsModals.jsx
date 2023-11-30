import Modal from 'react-bootstrap/Modal';

const ValueDetailsModals = (props) => {
	return (
		<Modal {...props} size={props.size} aria-labelledby='category-details-modal' centered>
			<Modal.Header closeButton>
				<Modal.Title id='category-details-modal'>{props.title}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<table className='my-table table table-hover table-striped table-bordered'>
					<tbody>
						<tr>
							<th>ID</th>
							<td>{props.details?.id}</td>
						</tr>
						<tr>
							<th>Name</th>
							<td>{props.details?.name}</td>
						</tr>
						<tr>
							<th>Status</th>
							<td>{props.details?.status}</td>
						</tr>
						<tr>
							<th>Created By</th>
							<td>{props.details?.created_by}</td>
						</tr>
						<tr>
							<th>Created at</th>
							<td>{props.details?.created_at}</td>
						</tr>
						<tr>
							<th>Updated at</th>
							<td>{props.details?.updated_at}</td>
						</tr>
					</tbody>
				</table>
			</Modal.Body>
		</Modal>
	);
};

export default ValueDetailsModals;
