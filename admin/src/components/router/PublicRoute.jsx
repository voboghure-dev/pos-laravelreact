import { createBrowserRouter } from "react-router-dom";
import Auth from "../layout/Auth";
import Login from "../modules/Login";
import Error500 from "../modules/Error500";
import Test from "../modules/Test";
import Another from "../modules/Another";

const PublicRoute = createBrowserRouter([
    {
        path: "/",
        element: <Auth />,
        children: [
            {
                path: "",
                element: <Login />,
            },
            {
                path: "error-500",
                element: <Error500 />,
            },
            {
                path: "test",
                element: <Test />,
            },
            {
                path: "another",
                element: <Another />,
            },
        ],
    },
]);

export default PublicRoute;
