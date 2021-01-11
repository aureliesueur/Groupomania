import http from "../http-common";

class ArticlesDataServices {
    getAll() {
        return http.get("/Articles");
    }
    get(id) {
        return http.get(`/Articles/${id}`);
    }
    create(data) {
        return http.post('/Articles/add', data);
    }
}

//A compléter pour les autres requêtes

export default new ArticlesDataServices();