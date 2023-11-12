import { createBrowserRouter } from "react-router-dom";
import Master from "../layout/Master";
import Dashboard from "../modules/Dashboard";
import Error500 from "../modules/Error500";
import Test from "../modules/Test";
import CategoryList from "../modules/CategoryList";
import Another from "../modules/Another";

const PrivateRoute = createBrowserRouter([
    {
        // path: "/dashboard",
        element: <Master />,
        children: [
            {
                path: "/dashboard",
                element: <Dashboard />,
            },
            // {
            //     path: "/dashboard/another",
            //     element: <Another />,
            // },
            // {
            //     path: "/dashboard/test",
            //     element: <Test />,
            // },
            // {
            //     path: "/dashboard/category",
            //     element: <CategoryList />,
            // },
            // {
            //     path: "/dashboard/error-500",
            //     element: <Error500 />,
            // },
        ],
    },
]);

export default PrivateRoute;
