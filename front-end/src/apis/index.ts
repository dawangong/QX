import http from "./config";

const fetchInfo = () => http({
    method: "GET",
    url: "/api/info",
});

export {
  fetchInfo
}