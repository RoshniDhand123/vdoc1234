import axios from "axios";
// import * as storage from "../storage";

// const BASE_URL = "http://45.79.127.100:8001/api/v1/";

const BASE_URL = "http://vdoc.ellocent.com/api/v1/";

const getToken = () => {
    let token = JSON.parse(localStorage.getItem("token"));
    if (token) return token.access_token;
    else return null;
};

const clearStorage = () => {
    localStorage.clear();
};

const requestHeaders = {
    "content-type": "application/json",
    Accept: "application/json",
    Authorization: getToken(),
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    get: (url) => {
        console.log(url);
        return new Promise((resolve, reject) =>
            axios
                .get(BASE_URL + url, { headers: requestHeaders })
                .then((response) => resolve(response))
                .catch((error) => {
                    if (
                        error &&
                        error.response &&
                        error.response.status === 401
                    ) {
                        clearStorage();
                        window.location.href = "/";
                    }
                    //console.log("api eneter");
                    resolve(error.response);
                    //console.log("api eneter");
                })
        );
    },
    post: (url, data, access_token) => {
        if (access_token) requestHeaders["Authorization"] = access_token;
        return new Promise((resolve, reject) =>
            axios
                .post(BASE_URL + url, data, { headers: requestHeaders })
                .then((response) => resolve(response))
                .catch((error) => reject(false))
        );
    },

    put: (url, data) => {
        return new Promise((resolve, reject) =>
            axios
                .put(BASE_URL + url, data, { headers: requestHeaders })
                .then((response) => resolve(response))
                .catch((error) => reject(false))
        );
    },
    delete: (url, data) => {
        return new Promise((resolve, reject) =>
            axios
                .delete(BASE_URL + url, { data, headers: requestHeaders })
                .then((response) => resolve(response))
                .catch((error) => reject(false))
        );
    },

    postFile: (url, data) => {
        const formData = new FormData();
        for (const property in data) {
            formData.append(property, data[property]);
        }
        return new Promise((resolve, reject) =>
            axios
                .post(BASE_URL + url, formData, { headers: requestHeaders })
                .then((res) => resolve(res))
                .catch((error) => reject(false))
        );
    },
};
