import http from "./httpServices";

export function getClasses() {
    return http.get('/classes');
}