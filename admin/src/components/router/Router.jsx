import { createBrowserRouter } from "react-router-dom";
import Master from "../layout/Master";
import Dashboard from "../modules/Dashboard";
import Login from "../modules/Login";
import Auth from "../layout/Auth";
import CategoryList from "../modules/CategoryList";
import Error500 from "../modules/Error500";
import Test from "../modules/Test";
import Public from "./Public";
import Protected from "./Protected";
import CategoryAdd from "../modules/CategoryAdd";

const Router = createBrowserRouter([
    {
        path: "/dashboard",
        element: (
            <Protected>
                <Master />
            </Protected>
        ),
        children: [
            {
                path: "/dashboard",
                element: <Dashboard />,
            },
            {
                path: "/dashboard/category/create",
                element: <CategoryAdd />,
            },
            {
                path: "/dashboard/category",
                element: <CategoryList />,
            },
            {
                path: "/dashboard/error-500",
                element: <Error500 />,
            },
        ],
    },
    {
        path: "/",
        element: (
            <Public>
                <Auth />
            </Public>
        ),
        children: [
            {
                path: "/",
                element: <Login />,
            },
            {
                path: "/test",
                element: <Test />,
            },
        ],
    },
]);

export default Router;
