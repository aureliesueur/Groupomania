import http from "../http-common";

class CommentsDataServices {
    getAll(slug, headers) {
        return http.get(`/articles/${slug}/comments`, { headers });
    }
    getOne(cryptoslug, slug, headers) {
        return http.get(`/articles/${slug}/comments/${cryptoslug}`, { headers });
    }
    create(slug, data, headers) {
        return http.post(`/articles/${slug}/comments`, data, { headers });
    }
    update(cryptoslug, slug, data, headers) {
        return http.put(`/articles/${slug}/comments/${cryptoslug}`, data, { headers });
    }
    delete(cryptoslug, slug, headers) {
        return http.delete(`/articles/${slug}/comments/${cryptoslug}`, { headers });
    }
}


export default new CommentsDataServices();