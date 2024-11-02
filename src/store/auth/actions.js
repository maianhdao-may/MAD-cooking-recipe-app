import { ADD_TO_FAVORITES, REMOVE_FROM_FAVORITES } from '../storeconstants';

export default {
  [ADD_TO_FAVORITES]({ commit }, meal) {
    commit(ADD_TO_FAVORITES, meal);
  },
  [REMOVE_FROM_FAVORITES]({ commit }, idMeal) {
    commit(REMOVE_FROM_FAVORITES, idMeal);
  }
};
