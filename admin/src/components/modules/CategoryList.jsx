import { useEffect, useState } from "react";
import Breadcrumb from "../partials/Breadcrumb";
import Constants from "../../Constants";
import axios from "axios";
import CategoryPhotoModals from "../partials/CategoryPhotoModals";
import Pagination from "react-js-pagination";

const CategoryList = () => {
    const [input, setInput] = useState({
        search: "",
        order_by: "serial",
        direction: "asc",
        per_page: "10",
    });
    const [isLoading, setIsLoading] = useState(false);

    const [modalShow, setModalShow] = useState(false);
    const [modalPhoto, setModalPhoto] = useState("");
    const [categories, setCategories] = useState([]);

    const [itemsCountPerPage, setItemsCountPerPage] = useState(0);
    const [totalItemsCount, setTotalItemsCount] = useState(1);
    const [startFrom, setStartFrom] = useState(1);
    const [activePage, setActivePage] = useState(1);

    const getCategories = (pageNumber = 1) => {
        setIsLoading(true);
        axios
            .get(
                `${Constants.BASE_URL}/category?page=${pageNumber}&search=${input.search}&order_by=${input.order_by}&per_page=${input.per_page}&direction=${input.direction}`
            )
            .then((res) => {
                setCategories(res.data.data);
                setItemsCountPerPage(res.data.meta.per_page);
                setTotalItemsCount(res.data.meta.total);
                setStartFrom(res.data.meta.from);
                setActivePage(res.data.meta.current_page);
                setIsLoading(false);
            });
    };

    const handlePhotoModal = (photo) => {
        setModalShow(true);
        setModalPhoto(photo);
    };

    const handleInput = (e) => {
        setInput((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    useEffect(() => {
        getCategories();
    }, []);

    return (
        <>
            <Breadcrumb title={"Category List"} />

            <div className="row">
                <div className="col-md-12">
                    <div className="card mb-4">
                        <div className="card-header">
                            <h4>Add Category</h4>
                        </div>
                        <div className="card-body">
                            <div className="search-area mb-4">
                                <div className="row">
                                    <div className="col-md-3">
                                        <label htmlFor="search">Search</label>
                                        <input
                                            className="form-control form-control-sm"
                                            id="search"
                                            type="search"
                                            name="search"
                                            onChange={handleInput}
                                            placeholder="Search..."
                                        />
                                    </div>
                                    <div className="col-md-3">
                                        <label htmlFor="order_by">
                                            Order By
                                        </label>
                                        <select
                                            className="form-control form-control-sm"
                                            id="order_by"
                                            name="order_by"
                                            value={input.order_by}
                                            onChange={handleInput}
                                        >
                                            <option value={"name"}>Name</option>
                                            <option value={"created_at"}>
                                                Created at
                                            </option>
                                            <option value={"updated_at"}>
                                                Updated at
                                            </option>
                                            <option value={"serial"}>
                                                Serial
                                            </option>
                                            <option value={"status"}>
                                                Status
                                            </option>
                                        </select>
                                    </div>
                                    <div className="col-md-2">
                                        <label htmlFor="direction">
                                            Order Direction
                                        </label>
                                        <select
                                            className="form-control form-control-sm"
                                            id="direction"
                                            name="direction"
                                            value={input.direction}
                                            onChange={handleInput}
                                        >
                                            <option value={"asc"}>ASC</option>
                                            <option value={"desc"}>DESC</option>
                                        </select>
                                    </div>
                                    <div className="col-md-2">
                                        <label htmlFor="per_page">
                                            Per Page
                                        </label>
                                        <select
                                            className="form-control form-control-sm"
                                            id="per_page"
                                            name="per_page"
                                            value={input.per_page}
                                            onChange={handleInput}
                                        >
                                            <option value={10}>10</option>
                                            <option value={25}>25</option>
                                            <option value={50}>50</option>
                                            <option value={100}>100</option>
                                        </select>
                                    </div>
                                    <div className="col-md-2">
                                        <div className="d-grid mt-4">
                                            <button
                                                onClick={() => getCategories(1)}
                                                className="btn btn-sm btn-primary"
                                                dangerouslySetInnerHTML={{
                                                    __html: isLoading
                                                        ? '<span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> Loading...'
                                                        : "Search",
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

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
                                                <td>{startFrom + index}</td>
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
                        <div className="card-footer">
                            <nav className="paginate mt-3">
                                <Pagination
                                    activePage={activePage}
                                    itemsCountPerPage={itemsCountPerPage}
                                    totalItemsCount={totalItemsCount}
                                    pageRangeDisplayed={5}
                                    itemClass={"page-item"}
                                    linkClass={"page-link"}
                                    prevPageText={"Previous"}
                                    firstPageText={"First"}
                                    lastPageText={"Last"}
                                    nextPageText={"Next"}
                                    onChange={getCategories}
                                />
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CategoryList;
