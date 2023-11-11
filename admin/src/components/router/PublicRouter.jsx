import { createBrowserRouter } from "react-router-dom";
import Auth from "../layout/Auth";
import Login from "../modules/Login";
import Error500 from "../modules/Error500";

const PublicRouter = createBrowserRouter([
    {
        path: "/",
        element: <Auth />,
        children: [
            {
                path: "/",
                element: <Login />,
            },
            {
                path: "/error-500",
                element: <Error500 />,
            },
        ],
    },
]);

export default PublicRouter;
