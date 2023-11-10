import { Helmet } from "react-helmet";
import logo from "../../assets/img/logo.png";
import { useState } from "react";
import axios from "axios";

const Login = () => {
    const [input, setInput] = useState({});
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleInput = (e) => {
        setInput((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleLogin = () => {
        setIsLoading(true);
        axios
            .post("https://pos-laravelreact.local/api/login", input)
            .then((res) => {
                localStorage.email = res.data.email;
                localStorage.name = res.data.name;
                localStorage.phone = res.data.phone;
                localStorage.photo = res.data.photo;
                localStorage.token = res.data.token;
                setIsLoading(false);
                window.location.reload();
            })
            .catch((errors) => {
                setIsLoading(false);
                if (errors.response.status == 422) {
                    setErrors(errors.response.data.errors);
                }
            });
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
                                                        className={
                                                            errors.email !=
                                                            undefined
                                                                ? "form-control is-invalid"
                                                                : "form-control"
                                                        }
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
                                                    <div className="invalid-feedback">
                                                        {errors.email !=
                                                        undefined
                                                            ? errors.email[0]
                                                            : null}
                                                    </div>
                                                </div>
                                                <div className="form-floating mb-3">
                                                    <input
                                                        className={
                                                            errors.password !=
                                                            undefined
                                                                ? "form-control is-invalid"
                                                                : "form-control"
                                                        }
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
                                                    <div className="invalid-feedback">
                                                        {errors.password !=
                                                        undefined
                                                            ? errors.password[0]
                                                            : null}
                                                    </div>
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
                                                <button
                                                    onClick={handleLogin}
                                                    className="btn btn-primary"
                                                    dangerouslySetInnerHTML={{
                                                        __html: isLoading
                                                            ? '<span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> Login...'
                                                            : "Login",
                                                    }}
                                                />
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
