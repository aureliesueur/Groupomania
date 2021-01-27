import http from "../http-common";

class ThumbsDataServices {
    /*getAll(slug) { //, headers) {
        return http.get(`/articles/${slug}/thumbs`); //, { headers });
    }*/
    postThumb(slug, data) { //, headers) {
        return http.post(`/articles/${slug}/`, data); //, { headers });
    }
    /*delete(cryptoslug, slug, headers) {
        return http.delete(`/articles/${slug}/comments/${cryptoslug}`, { headers });
    }*/
}


export default new ThumbsDataServices();