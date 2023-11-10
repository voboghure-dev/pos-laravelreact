import { createBrowserRouter } from "react-router-dom";
import Master from "../layout/Master";
import Dashboard from "../modules/Dashboard";

const ProtectedRouter = createBrowserRouter([
    {
        path: "/",
        element: <Master />,
        children: [
            {
                path: "/",
                element: <Dashboard />,
            },
        ],
    },
]);

export default ProtectedRouter;
