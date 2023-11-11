import $ from "jquery";
import logo from "./../../assets/img/logo.png";
import Swal from "sweetalert2";
import axios from "axios";
import Constants from "../../Constants";

const Nav = () => {
    const handleSidebar = () => {
        $("body").toggleClass("sb-sidenav-toggled");
    };

    const handleLogout = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You will be logged out!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, logout!",
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .post(`${Constants.BASE_URL}/logout`)
                    .then((res) => {
                        localStorage.removeItem("email");
                        localStorage.removeItem("name");
                        localStorage.removeItem("phone");
                        localStorage.removeItem("photo");
                        localStorage.removeItem("token");
                        window.location.reload();
                    })
                    .catch((errors) => {});
            }
        });
    };

    return (
        <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
            <a className="navbar-brand ps-3" href="index.html">
                <img src={logo} alt={"ERPOnline Logo"} height={50} />
            </a>
            <button
                onClick={handleSidebar}
                className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0"
                id="sidebarToggle"
                href="#!"
            >
                <i className="fas fa-bars"></i>
            </button>
            <span className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0 text-white">
                Admin
            </span>
            <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
                <li className="nav-item dropdown">
                    <a
                        className="nav-link dropdown-toggle"
                        id="navbarDropdown"
                        href="#"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        <i className="fas fa-user fa-fw"></i>
                    </a>
                    <ul
                        className="dropdown-menu dropdown-menu-end"
                        aria-labelledby="navbarDropdown"
                    >
                        <li>
                            <a className="dropdown-item" href="#!">
                                Settings
                            </a>
                        </li>
                        <li>
                            <a className="dropdown-item" href="#!">
                                Activity Log
                            </a>
                        </li>
                        <li>
                            <hr className="dropdown-divider" />
                        </li>
                        <li>
                            <button
                                onClick={handleLogout}
                                className="dropdown-item"
                            >
                                Logout
                            </button>
                        </li>
                    </ul>
                </li>
            </ul>
        </nav>
    );
};

export default Nav;
