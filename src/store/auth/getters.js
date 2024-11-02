import {IS_USER_AUTHENTICATED, GET_USERNAME } from "../storeconstants";
import { IS_FAVORITE } from '../storeconstants';

export default {
    [IS_USER_AUTHENTICATED](state) {
        return state.authenticated;
    },

    [GET_USERNAME](state) {
        return state.username;
    },

    [IS_FAVORITE]: (state) => (idMeal) => {
        return state.favorites.some(fav => fav.idMeal === idMeal);
      },

    favorites: (state) => {
        return state.favorites;
    }
}