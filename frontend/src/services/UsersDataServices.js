import http from "../http-common";

class UsersDataServices {
    login(data) {
        return http.post('/auth/login', data);
    }
    signup(data) {
        return http.post('/auth/signup', data);
    }
}


export default new UsersDataServices();