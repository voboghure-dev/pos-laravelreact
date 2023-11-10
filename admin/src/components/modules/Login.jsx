import { Helmet } from "react-helmet";
import logo from "../../assets/img/logo.png";
import { useState } from "react";

const Login = () => {
    const [input, setInput] = useState({});

    const handleInput = (e) => {
        setInput((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    return (
        <>
            <Helmet>
                <title>Login | My POS</title>
            </Helmet>

            <div id="layoutAuthentication" className="bg-gray-300">
                <div id="layoutAuthentication_content">
                    <main>
                        <div className="container mt-5">
                            <div className="row justify-content-center">
                                <div className="col-lg-5">
                                    <img
                                        src={logo}
                                        alt="ERPOnline Logo"
                                        className="my-2 w-50 mx-auto d-flex"
                                    />

                                    <div className="card shadow-lg border-0 rounded-lg mt-5">
                                        <div className="card-header">
                                            <h3 className="text-center font-weight-light my-4">
                                                Login
                                            </h3>
                                        </div>
                                        <div className="card-body">
                                            <form>
                                                <div className="form-floating mb-3">
                                                    <input
                                                        className="form-control"
                                                        id="inputEmail"
                                                        type="email"
                                                        name="email"
                                                        value={
                                                            input.email || ""
                                                        }
                                                        onChange={handleInput}
                                                        placeholder="name@example.com"
                                                    />
                                                    <label htmlFor="inputEmail">
                                                        Email address
                                                    </label>
                                                </div>
                                                <div className="form-floating mb-3">
                                                    <input
                                                        className="form-control"
                                                        id="inputPassword"
                                                        type="password"
                                                        name="password"
                                                        value={
                                                            input.password || ""
                                                        }
                                                        onChange={handleInput}
                                                        placeholder="Password"
                                                    />
                                                    <label htmlFor="inputPassword">
                                                        Password
                                                    </label>
                                                </div>
                                                <div className="form-check mb-3">
                                                    <input
                                                        className="form-check-input"
                                                        id="inputRememberPassword"
                                                        type="checkbox"
                                                        value=""
                                                    />
                                                    <label
                                                        className="form-check-label"
                                                        htmlFor="inputRememberPassword"
                                                    >
                                                        Remember Password
                                                    </label>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="card-footer text-center py-3">
                                            <div className="d-flex align-items-center justify-content-between my-1">
                                                <a
                                                    className="small"
                                                    href="password.html"
                                                >
                                                    Forgot Password?
                                                </a>
                                                <a
                                                    className="btn btn-primary"
                                                    href="index.html"
                                                >
                                                    Login
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
};

export default Login;
