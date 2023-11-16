import axios from "axios";
import GlobalFunctions from "./GlobalFunctions";

// Add a request interceptor
axios.interceptors.request.use(
    function (config) {
        if (localStorage.token != undefined) {
            config.headers["Authorization"] = `Bearer ${localStorage.token}`;
        }
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

// Add a response interceptor
axios.interceptors.response.use(
    function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
    },
    function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        if (error.response.status == 401) {
            GlobalFunctions.logOut();
        } else if (error.response.status == 500) {
            window.location.href = window.location.origin + "dashboard/error-500";
        }
        return Promise.reject(error);
    }
);
