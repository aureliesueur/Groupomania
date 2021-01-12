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
}

//A compléter pour les autres requêtes

export default new ArticlesDataServices();