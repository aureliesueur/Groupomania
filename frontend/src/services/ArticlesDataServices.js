import http from "../http-common";

class ArticlesDataServices {
    getAll(headers) {
        return http.get("/articles", { headers });
    }
    getOne(id, headers) {
        return http.get(`/articles/${id}`, { headers });
    }
    create(data, headers) {
        return http.post('/articles/add', data, { headers });
    }
    update(id, data, headers) {
        return http.put(`/articles/${id}`, data, { headers });
    }
    delete(id, headers) {
        return http.delete(`/articles/${id}`, { headers });
    }
}



export default new ArticlesDataServices();