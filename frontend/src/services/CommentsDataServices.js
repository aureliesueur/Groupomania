import http from "../http-common";

class CommentsDataServices {
    getAll(id, headers) {
        return http.get(`/articles/${id}/comments`, { headers });
    }
    /*getOne(id, headers) {
        return http.get(`/articles/${id}`, { headers });
    }*/
    create(id, data, headers) {
        return http.post(`/articles/3/comments`, data, { headers });//${id}
    }
    /*update(id, data, headers) {
        return http.put(`/articles/${id}`, data, { headers });
    }
    delete(id, headers) {
        return http.delete(`/articles/${id}`, { headers });
    }*/
}


export default new CommentsDataServices();