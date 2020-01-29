import http from "./httpServices";

const apiEndPoint = "/customers";

function customerUrl(id) {
    return `${apiEndPoint}/${id}`;
}

export function getCustomers() {
    return http.get(apiEndPoint);
}

export function getCustomer(customerId) {
    return http.get(customerUrl(customerId));
}

export function saveCustomer(customer) {
    const body = { ...customer };
    delete body._id;
    if (customer._id) {
        return http.put(customerUrl(customer._id), body);
    }
    return http.post(apiEndPoint, customer);
}

export function deleteCustomer(customerId) {
    return http.delete(customerUrl(customerId));
}