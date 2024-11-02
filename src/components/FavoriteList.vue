<template>
    <div>
      <h1 class="text-center">Favorite Meals List</h1>
      <div v-if="favorites.length > 0" class="favorites">
        <div class="row">
          <div v-for="meal in favorites" :key="meal.idMeal" class="col-sm-4">
            <div class="meal-card">
              <h2>{{ meal.strMeal }}</h2>
              <div class="heart" :class="{favorited: isFavorite(meal.idMeal)}" @click="toggleFavorite(meal)"></div>
              <img :src="meal.strMealThumb" :alt="meal.strMeal" class="meal-image" />
              <h3>Category: {{ meal.strCategory }}</h3>
              <ul>
                <li style="list-style-type: none">Ingredient</li>
                <li class="ingredient" v-for="ingredient in getIngredients(meal)" :key="ingredient">{{ ingredient }}</li>
              </ul>
              <h4>Instruction:</h4>
              <p>{{ meal.strInstructions }}</p>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="text-center">Add your favourite meals to make them later.</div>
    </div>
  </template>
  
  <script>
  import { mapGetters, mapActions } from 'vuex';
  import { ADD_TO_FAVORITES, REMOVE_FROM_FAVORITES, IS_FAVORITE } from '@/store/storeconstants';
  
  export default {
    computed: {
      //get from store
        ...mapGetters('auth', {
      isFavorite: IS_FAVORITE,
      favorites: 'favorites'
    })
},

    methods: {
      ...mapActions('auth', {
      addToFavorites: ADD_TO_FAVORITES,
      removeFromFavorites: REMOVE_FROM_FAVORITES
      }),

      //toggle favorite button
      toggleFavorite(meal) {
          if (this.isFavorite(meal.idMeal)) {
              this.removeFromFavorites(meal.idMeal);
          } else {
              this.addToFavorites(meal);
          }
      },
      //get ingredients and measurement from MealDB
        getIngredients(meal) {
        const ingredients = [];
        for (let i = 1; i <= 20; i++) {
          const ingredient = meal[`strIngredient${i}`];
          const measure = meal[`strMeasure${i}`];
          if (ingredient && measure) {
            ingredients.push(`${ingredient} - ${measure}`);
          } else if (ingredient) {
            ingredients.push(ingredient);
          }
        }
        return ingredients;
      },
    }
  };
  </script>
  
  <style scoped>
  .meal-card {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 16px;
    margin: 16px 0;
    text-align: center;
    background-color: #f9f9f9;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  .meal-image {
    width: 100%;
    height: auto;
    border-radius: 8px;
    margin-bottom: 16px;
  }
  .favorites {
    margin-top: 2rem;
  }

  .heart {
  width: 30px;
  height: 30px;
  background-image: url("@/assets/heart.png"); 
  background-size: cover;
  position: absolute;
  margin-top: -50px;
  cursor: pointer;
}
.heart.favorited {
  background-image: url("@/assets/heart_fav.png");
}
  </style>
  