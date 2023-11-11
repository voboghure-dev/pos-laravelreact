import Breadcrumb from "../partials/Breadcrumb";

const Error500 = () => {
    return (
        <>
            <Breadcrumb title={"Error 500"} />

            <div className="row">
                <div className="col-md-6">
                    <h2 className="text-danger">Server Error</h2>
                </div>
            </div>
        </>
    );
};

export default Error500;
