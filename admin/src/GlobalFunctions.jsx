const GlobalFunctions = {
    logOut() {
        localStorage.removeItem("email");
        localStorage.removeItem("name");
        localStorage.removeItem("phone");
        localStorage.removeItem("photo");
        localStorage.removeItem("role_id");
        localStorage.removeItem("token");

        window.location.reload();
    },
};

export default GlobalFunctions;
