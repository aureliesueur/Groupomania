import http from "../http-common";

class CommentsDataServices {
    getAll(id, headers) {
        return http.get(`/articles/${id}/comments`, { headers });
    }
    /*getOne(id, headers) {
        return http.get(`/articles/${id}`, { headers });
    }*/
    create(id, data, headers) {
        return http.post(`/articles/${id}/comments`, data, { headers });
    }
    /*update(id, data, headers) {
        return http.put(`/articles/${id}`, data, { headers });
    }
    delete(id, headers) {
        return http.delete(`/articles/${id}`, { headers });
    }*/
}


export default new CommentsDataServices();