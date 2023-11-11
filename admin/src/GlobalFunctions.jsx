const GlobalFunctions = {
    logOut() {
        localStorage.removeItem("email");
        localStorage.removeItem("name");
        localStorage.removeItem("phone");
        localStorage.removeItem("photo");
        localStorage.removeItem("token");

        window.location.reload();
    },
};

export default GlobalFunctions;
