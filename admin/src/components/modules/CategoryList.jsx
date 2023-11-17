import { useEffect, useState } from "react";
import Breadcrumb from "../partials/Breadcrumb";
import Constants from "../../Constants";
import axios from "axios";
import CategoryPhotoModals from "../partials/CategoryPhotoModals";

const CategoryList = () => {
    const [modalShow, setModalShow] = useState(false);
    const [modalPhoto, setModalPhoto] = useState("");
    const [categories, setCategories] = useState([]);

    const getCategories = () => {
        axios.get(`${Constants.BASE_URL}/category`).then((res) => {
            setCategories(res.data.data);
        });
    };

    const handlePhotoModal = (photo) => {
        setModalShow(true);
        setModalPhoto(photo);
    };

    useEffect(() => {
        getCategories();
    }, []);

    return (
        <>
            <Breadcrumb title={"Category List"} />

            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <h4>Add Category</h4>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="my-table table table-hover table-striped table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Sl</th>
                                            <th>Name / Slug</th>
                                            <th>Serial / Status</th>
                                            <th>Photo</th>
                                            <th>Created By</th>
                                            <th>Date & Time</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {categories.map((category, index) => (
                                            <tr key={index}>
                                                <td>{++index}</td>
                                                <td>
                                                    <p className="text-primary">
                                                        Name: {category.name}
                                                    </p>
                                                    <p className="text-success">
                                                        Slug: {category.slug}
                                                    </p>
                                                </td>
                                                <td>
                                                    <p className="text-primary">
                                                        Serial:{" "}
                                                        {category.serial}
                                                    </p>
                                                    <p className="text-success">
                                                        Status:{" "}
                                                        {category.status}
                                                    </p>
                                                </td>
                                                <td>
                                                    <img
                                                        onClick={() =>
                                                            handlePhotoModal(
                                                                category.photo
                                                            )
                                                        }
                                                        src={
                                                            category.photo_thumb
                                                        }
                                                        alt={category.name}
                                                        className="img-thumbnail mx-auto d-block category-photo"
                                                    />
                                                </td>
                                                <td>
                                                    <p>{category.created_by}</p>
                                                </td>
                                                <td>
                                                    <p className="text-primary">
                                                        {category.created_at}
                                                    </p>
                                                    <p className="text-success">
                                                        {category.updated_at}
                                                    </p>
                                                </td>
                                                <td>Action</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <CategoryPhotoModals
                                    show={modalShow}
                                    onHide={() => setModalShow(false)}
                                    title="Category Photo"
                                    size=""
                                    photo={modalPhoto}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CategoryList;
