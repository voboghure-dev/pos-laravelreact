import { useState } from "react";
import Breadcrumb from "../partials/Breadcrumb";

const CategoryAdd = () => {
    const [input, setInput] = useState({ status: 1 });
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleInput = (e) => {
        setInput((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handlePhoto = (e) => {
        let file = e.target.files[0];
        let reader = new FileReader();
        reader.onloadend = () => {
            setInput((prevState) => ({
                ...prevState,
                photo: reader.result,
            }));
        };
        reader.readAsDataURL(file);
    };

    const handleCategoryAdd = () => {
        console.log(input);
    };

    return (
        <>
            <Breadcrumb title={"Add Category"} />

            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <h4>Add Category</h4>
                        </div>
                        <div className="card-body">
                            {/** name, slug, description, serial, photo, status */}
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label
                                        className="small mb-1"
                                        htmlFor="name"
                                    >
                                        Name
                                    </label>
                                    <input
                                        className={
                                            errors.name != undefined
                                                ? "form-control is-invalid"
                                                : "form-control"
                                        }
                                        name="name"
                                        id="name"
                                        value={input.name}
                                        onChange={handleInput}
                                        type="text"
                                        placeholder="Enter category name"
                                    />
                                    <div className="invalid-feedback">
                                        {errors.name != undefined
                                            ? errors.name[0]
                                            : null}
                                    </div>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label
                                        className="small mb-1"
                                        htmlFor="slug"
                                    >
                                        Slug
                                    </label>
                                    <input
                                        className={
                                            errors.slug != undefined
                                                ? "form-control is-invalid"
                                                : "form-control"
                                        }
                                        name="slug"
                                        id="slug"
                                        value={input.slug}
                                        onChange={handleInput}
                                        type="text"
                                        placeholder="Enter category slug"
                                    />
                                    <div className="invalid-feedback">
                                        {errors.slug != undefined
                                            ? errors.slug[0]
                                            : null}
                                    </div>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label
                                        className="small mb-1"
                                        htmlFor="serial"
                                    >
                                        Serial
                                    </label>
                                    <input
                                        className={
                                            errors.serial != undefined
                                                ? "form-control is-invalid"
                                                : "form-control"
                                        }
                                        name="serial"
                                        id="serial"
                                        value={input.serial}
                                        onChange={handleInput}
                                        type="number"
                                        placeholder="Enter category serial"
                                    />
                                    <div className="invalid-feedback">
                                        {errors.serial != undefined
                                            ? errors.serial[0]
                                            : null}
                                    </div>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label
                                        className="small mb-1"
                                        htmlFor="status"
                                    >
                                        Status
                                    </label>
                                    <select
                                        className={
                                            errors.status != undefined
                                                ? "form-control is-invalid"
                                                : "form-control"
                                        }
                                        name="status"
                                        id="status"
                                        value={input.status}
                                        onChange={handleInput}
                                        type="number"
                                        placeholder="Enter category status"
                                    >
                                        <option value={1}>Active</option>
                                        <option value={0}>Inactive</option>
                                    </select>
                                    <div className="invalid-feedback">
                                        {errors.status != undefined
                                            ? errors.status[0]
                                            : null}
                                    </div>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label
                                        className="small mb-1"
                                        htmlFor="description"
                                    >
                                        Description
                                    </label>
                                    <textarea
                                        className={
                                            errors.description != undefined
                                                ? "form-control is-invalid"
                                                : "form-control"
                                        }
                                        name="description"
                                        id="description"
                                        value={input.description}
                                        onChange={handleInput}
                                        placeholder="Enter category description"
                                        rows="3"
                                    />
                                    <div className="invalid-feedback">
                                        {errors.description != undefined
                                            ? errors.description[0]
                                            : null}
                                    </div>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label
                                        className="small mb-1"
                                        htmlFor="photo"
                                    >
                                        Photo
                                    </label>
                                    <input
                                        className={
                                            errors.photo != undefined
                                                ? "form-control is-invalid"
                                                : "form-control"
                                        }
                                        id="photo"
                                        onChange={handlePhoto}
                                        type="file"
                                        placeholder="Enter category photo"
                                        rows="3"
                                    />
                                    {input.photo != undefined ? (
                                        <div className="row">
                                            <div className="col-md-6">
                                                <img
                                                    src={input.photo}
                                                    alt="Category photo"
                                                    className="img-thumbnail"
                                                />
                                            </div>
                                        </div>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                        <div className="card-footer">
                            <button
                                className="btn btn-primary"
                                type="button"
                                onClick={handleCategoryAdd}
                            >
                                Save changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CategoryAdd;
