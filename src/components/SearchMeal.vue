<template>
    <div>
      <div class="header">
          <h1>What would you like to make today?</h1>
          <input type="text" placeholder="Search your recipe..." v-model="searchQuerry.strMeal">
      </div>
      <div class="filter">
          <h3>Filter by category:</h3><v-bind></v-bind>
          <select v-model="searchQuerry.strCategory">
              <option value="">All</option>
              <option v-for="category in categories" :key="category">{{ category }}</option>
          </select>
      </div>
      <div class="row" v-if="meals.length > 0">
        <div v-for="meal in getItems" :key="meal.idMeal" class="col-sm-4">
          <div class="meal-card">
            <h3>{{ meal.strMeal }}
              <div class="heart" :class="{favorited: isFavorite(meal.idMeal)}" @click="toggleFavorite(meal)"></div>
            </h3>
            <img :src="meal.strMealThumb" :alt="meal.strMeal" class="meal-image" />
            <h3>Category: {{ meal.strCategory }}</h3>
            <h4>Ingredients:</h4>
            <p v-for="ingredient in getIngredients(meal)" :key="ingredient">{{ ingredient }}</p> 
          </div>
        </div>
      </div>
      <div v-else-if="error">{{ error }}</div>
      <div v-else>No meals found</div>

      <!-- Vue Paginate template -->
      <div class="page_number">
      <paginate
        :page-count="getPageCount" 
        :page-range="6" 
        :margin-pages="2" 
        :click-handler="clickCallback" 
        :prev-text=" 'Prev' " 
        :next-text="'Next'" 
        :container-class="'pagination'" 
        :page-class="'page-item'">
      </paginate>
    </div>
  </div>
  </template>
  
  <script>
  import Paginate from "vuejs-paginate-next";
  import { mapGetters, mapActions } from 'vuex';
  import { ADD_TO_FAVORITES, REMOVE_FROM_FAVORITES, IS_FAVORITE } from '@/store/storeconstants';
  
  // import axios from 'axios';
  export default {
    components: {
      paginate: Paginate
    },
  
    data() {
      return {
        searchQuerry:{
            strMeal: '',
            strCategory: ''
        },
        meals: [],
        error: '',
        perPage: 6,
        currentPage: 1,
      };
    },
    computed: {
      ...mapGetters('auth', {
      isFavorite: IS_FAVORITE,
      favorites: 'favorites'
    }),

      //filter by name and category
      filterObj: function(){
          return this.meals.filter( (meal) =>
              meal.strMeal.toLowerCase().includes(this.searchQuerry.strMeal.toLowerCase()) &&
              meal.strCategory.toLowerCase().includes(this.searchQuerry.strCategory.toLowerCase())
          )
      },
      // returns the data according to the page number
      getItems: function() {
        let current = this.currentPage * this.perPage;
        let start = current - this.perPage;
        return this.filterObj.slice(start, current);
      },
      //returns total number of pages required according to the total rows of data
      getPageCount: function() {
        return Math.ceil(this.filterObj.length / this.perPage);
      }
    },
    
    methods: {
      ...mapActions('auth', {
      addToFavorites: ADD_TO_FAVORITES,
      removeFromFavorites: REMOVE_FROM_FAVORITES
    }),

      clickCallback: function(pageNum) {
          this.currentPage = Number(pageNum);
        },
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

    // get categories from mealDb API
    fetchCategories() {
      fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
        .then(response => response.json())
        .then(data => {
          this.categories = data.categories.map(category => category.strCategory);
        })
        .catch(error => {
          console.error('Error fetching categories:', error);
        });
    },

    //togger heart button
    toggleFavorite(meal) {
      if (this.isFavorite(meal.idMeal)) {
        this.removeFromFavorites(meal.idMeal);
      } else {
        this.addToFavorites(meal);
      }
    },
    },
  
    mounted() {
        this.fetchCategories();
        var self = this;
        var alphabets = 'abcdefghijklmnopqrstuvwxyz'.split('');
        var promises = [];
  
      alphabets.forEach(alphabet => {
        var url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${alphabet}`;
        promises.push(
          fetch(url)
            .then(response => response.json())
            .then(data => {
              if (data.meals) {
                // Add meals for this alphabet to the meals array
                self.meals.push(...data.meals);
              }
            })
            .catch(error => { 
              console.error(`Failed to fetch meals for ${alphabet}`, error);
            })
        );
      });
  
      // Wait for all requests to finish
      Promise.all(promises)
        .then(() => {
          console.log('All requests finished');
        })
        .catch(error => {
          self.error = 'Error fetching meals';
          console.error('Error fetching meals:', error);
        });
    }
  };
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  .error-message {
    color: red;
    margin-bottom: 20px;
  }
.filter {
  text-align: center;
  margin: 10px;
}

.meal-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  margin: 16px 0;
  text-align: center;
  background-color: #f9f9f9;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}
.meal-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 16px;
}

.heart {
  width: 30px;
  height: 30px;
  background-image: url("@/assets/heart.png"); 
  background-size: cover;
  position: absolute;
  margin-top: -30px;
  cursor: pointer;
}
.heart.favorited {
  background-image: url("@/assets/heart_fav.png");
}

.page_number {
  display: flex;
  justify-content: center;
}


  </style>
  