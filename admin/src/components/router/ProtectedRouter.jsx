import { createBrowserRouter } from "react-router-dom";
import Master from "../layout/Master";
import Dashboard from "../modules/Dashboard";
import Error500 from "../modules/Error500";

const ProtectedRouter = createBrowserRouter([
    {
        path: "/",
        element: <Master />,
        children: [
            {
                path: "/",
                element: <Dashboard />,
            },
            {
                path: "/error-500",
                element: <Error500 />,
            },
        ],
    },
]);

export default ProtectedRouter;
