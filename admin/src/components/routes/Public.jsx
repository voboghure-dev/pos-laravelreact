// import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const Public = ({ children }) => {
    // const [auth, setAuth] = useState(false);

    // useEffect(() => {
    //     if (localStorage.token != undefined) {
    //         setAuth(true);
    //     }
    // }, []);

    return !localStorage.token ? children : <Navigate to={"/dashboard"} replace />;
};

export default Public;
