import "./assets/css/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./assets/css/style.scss";
import "./AxiosInterceptors";

// import { useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
import Router from "./components/router/Router";

function App() {
    // const [auth, setAuth] = useState(false);

    // useEffect(() => {
    //     if (localStorage.token != undefined) {
    //         setAuth(true);
    //     }
    // }, []);

    return <RouterProvider router={Router} />;
}

export default App;
