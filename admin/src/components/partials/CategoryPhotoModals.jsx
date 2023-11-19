import Modal from 'react-bootstrap/Modal';

const CategoryPhotoModals = (props) => {
    return (
        <Modal
            {...props}
            size={props.size}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <img src={props.photo} className='img-thumbnail mx-auto d-block' alt={props.title} />
            </Modal.Body>
        </Modal>
    );
};

export default CategoryPhotoModals;
