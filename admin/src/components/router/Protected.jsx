// import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const Protected = ({ children }) => {
    // const [auth, setAuth] = useState(false);

    // useEffect(() => {
    //     if (localStorage.token != undefined) {
    //         setAuth(true);
    //     }
    // }, []);

    return localStorage.token ? children : <Navigate to={"/"} replace />;
};

export default Protected;
