import http from "../http-common";

class ThumbsDataServices {
    getAllThumbs(slug, headers) {
        return http.get(`/articles/${slug}/thumbs`, { headers });
    }
    postThumb(slug, data, headers) {
        return http.post(`/articles/${slug}/thumbs`, data, { headers });
    }
    delete(slug, headers) {
        return http.delete(`/articles/${slug}/thumbs`, { headers });
    }
}


export default new ThumbsDataServices();