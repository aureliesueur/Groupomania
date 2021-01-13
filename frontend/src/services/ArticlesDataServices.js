import http from "../http-common";

class ArticlesDataServices {
    getAll() {
        return http.get("/articles");
    }
    getOne(id) {
        return http.get(`/articles/${id}`);
    }
    create(data) {
        return http.post('/articles/add', data);
    }
    update(id, data) {
        return http.put(`/articles/${id}`, data);
    }
    delete(id) {
        return http.delete(`/articles/${id}`);
    }
}

//A compléter pour les autres requêtes

export default new ArticlesDataServices();