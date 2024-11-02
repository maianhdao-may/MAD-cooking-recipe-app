import mutations from './mutations';
import getters from './getters';
import actions from './actions';

export default {
    namespaced: true,
    state() {
        return {
            authenticated: false,
            username: "",
            favorites: JSON.parse(localStorage.getItem('favorites')) || [],
        }
    },
    actions,
    mutations,
    getters
}