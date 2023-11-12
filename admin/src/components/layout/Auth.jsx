import { HelmetProvider } from "react-helmet-async";
import { Outlet } from "react-router-dom";

const Auth = () => {
    return (
        <HelmetProvider>
            <Outlet />
        </HelmetProvider>
    );
};

export default Auth;
