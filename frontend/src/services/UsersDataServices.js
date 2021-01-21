import http from "../http-common";

class UsersDataServices {
    login(data) {
        return http.post('/auth/login', data);
    }
    signup(data) {
        return http.post('/auth/signup', data);
    }
    getCurrentUser(id) {
        return http.get(`/auth/${id}`);
    }
    deleteUser(id) {
        return http.delete(`/auth/${id}`);
    }
}


export default new UsersDataServices();