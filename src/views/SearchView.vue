<template>
    <div class="search">
      <SearchMeal/>
    </div>
  </template>
  
  <script>
  // @ is an alias to /src
  import SearchMeal from '@/components/SearchMeal.vue'
  
  export default {
    name: 'SearchView',
    components: {
        SearchMeal,
    }
  }
  </script>
  