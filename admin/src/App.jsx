import "./assets/css/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./assets/css/style.scss";
import "./AxiosInterceptors";

import { useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
import PrivateRoute from "./components/router/PrivateRoute";
import PublicRoute from "./components/router/PublicRoute";

function App() {
    const [auth, setAuth] = useState(false);

    useEffect(() => {
        if (localStorage.token != undefined) {
            setAuth(true);
        }
    }, []);
    console.log(auth);

    return (
        <>
            {auth ? (
                <RouterProvider router={PrivateRoute} />
            ) : (
                <RouterProvider router={PublicRoute} />
            )}
        </>
    );
}

export default App;
