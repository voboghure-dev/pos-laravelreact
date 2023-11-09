import { Helmet } from "react-helmet";

const Breadcrumb = (props) => {
    return (
        <>
            <Helmet>
                <title>{props.title} | My POS</title>
            </Helmet>

            <ol className="breadcrumb my-4">
                <li className="breadcrumb-item">Dashboard</li>
                <li className="breadcrumb-item active">{props.title}</li>
            </ol>
        </>
    );
};

export default Breadcrumb;
