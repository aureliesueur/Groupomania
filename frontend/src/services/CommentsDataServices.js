import http from "../http-common";

class CommentsDataServices {
    getAll(slug, headers) {
        return http.get(`/articles/${slug}/comments`, { headers });
    }
    getOne(id, slug, headers) {
        return http.get(`/articles/${slug}/comments/${id}`, { headers });
    }
    create(slug, data, headers) {
        return http.post(`/articles/${slug}/comments`, data, { headers });
    }
    update(id, slug, data, headers) {
        return http.put(`/articles/${slug}/comments/${id}`, data, { headers });
    }
    delete(id, slug, headers) {
        return http.delete(`/articles/${slug}/comments/${id}`, { headers });
    }
}


export default new CommentsDataServices();