import "./assets/css/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./assets/css/style.scss";

import { useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
import ProtectedRouter from "./components/router/ProtectedRouter";
import PublicRouter from "./components/router/PublicRouter";

function App() {
    const [auth, setAuth] = useState(false);

    useEffect(() => {
        if (localStorage.token != undefined) {
            setAuth(true);
        }
    }, []);

    return (
        <>
            {auth ? (
                <RouterProvider router={ProtectedRouter} />
            ) : (
                <RouterProvider router={PublicRouter} />
            )}
        </>
    );
}

export default App;
