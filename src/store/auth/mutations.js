import { SET_AUTHENTICATION, SET_USERNAME} from "../storeconstants";
import { ADD_TO_FAVORITES, REMOVE_FROM_FAVORITES } from '../storeconstants';

export default {

    [SET_AUTHENTICATION](state, authenticated) {
        state.authenticated = authenticated
    },
    [SET_USERNAME](state, username) {
        state.username = username
    },
    [ADD_TO_FAVORITES](state, meal) {
        state.favorites.push(meal);
        localStorage.setItem('favorites', JSON.stringify(state.favorites));
    },
    [REMOVE_FROM_FAVORITES](state, mealId) {
        state.favorites = state.favorites.filter(fav => fav.idMeal !== mealId);
        localStorage.setItem('favorites', JSON.stringify(state.favorites));
    }
}