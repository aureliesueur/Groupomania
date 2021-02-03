import http from "../http-common";

class ArticlesDataServices {
    getAll(headers) {
        return http.get("/articles", { headers });
    }
    getOne(slug, headers) {
        return http.get(`/articles/${slug}`,{ headers }); 
    }
    create(data, headers) {
        return http.post('/articles/add', data, { headers });
    }
    update(id, data, headers) {
        return http.put(`/articles/${id}`, data, { headers });
    }
    delete(slug, headers) {
        return http.delete(`/articles/${slug}`, { headers });
    }
}



export default new ArticlesDataServices();


