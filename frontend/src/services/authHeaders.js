import $store from "vuex"

export default function authHeaders() {
    let storedId = $store.state.userId;
    let storedToken = $store.state.token;
    console.log(storedId, storedToken);
    if (storedId && storedToken) {
        return { Authorization: 'Bearer ' + storedToken };
    } else {
        return {};
    }
}