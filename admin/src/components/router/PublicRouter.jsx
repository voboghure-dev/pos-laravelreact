import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Auth from "../layout/Auth";
import Login from "../modules/Login";

const PublicRouter = createBrowserRouter([
    {
        path: "/",
        element: <Auth />,
        children: [
            {
                path: "/",
                element: <Login />,
            },
        ],
    },
]);

export default PublicRouter;
