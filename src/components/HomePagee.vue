<template>
  <div>
    <div class="header">
      <h1>Welcome to MAD Cooking</h1>
      <quote>A place you can find all the recipe.</quote>
    </div>
      <div class="container">
        <h2 class="text-center">Special of the day</h2>
        <div v-if="error" class="error-message">{{ error }}</div>
      <div v-if="meal" class="meal-info">
        <div class="row">
          <div class="col-lg-6">
            <img :src="meal.strMealThumb" :alt="meal.strMeal" class="img-thumbnail"  />
          </div>
          <div class="col-lg-6">
            <h3 class="text-center">Name: {{meal.strMeal}}</h3>
            <h3 class="text-center">Category: {{meal.strCategory}}</h3>
            <h4>Ingredients:</h4>
            <ul>
              <li class="ingredient" v-for="ingredient in getIngredients(meal)" :key="ingredient">{{ ingredient }}</li>
            </ul>
            <h4>Instruction:</h4>
            <p>{{ meal.strInstructions }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      meal: '',
      error: '',
    };
  },
  methods: {
    //get random meal using mealDB API
    async getRandomMeal() {
      try {
        const response = await axios.get('https://www.themealdb.com/api/json/v1/1/random.php');
        this.meal = response.data.meals[0];
      } catch (error) {
        this.error = 'Failed to retrieve data';
        console.error(error);
      }
    },
    
    //get ingredients from meal
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
  },


  mounted() {
    this.getRandomMeal();
  },
};
</script>
