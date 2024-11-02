<template>
  <div v-if="getUsername()">
  <h3 class="text-center">Welcome {{getUsername()}}</h3>
  <nav class="text-center">
      <button class="p-2 m-3 btn btn-warning" @click="navigate('favorite')">My Favorite</button>
      <button class="p-2 m-3 btn btn-warning" @click="navigate('myrecipe')">My Recipe</button>
      <button class="p-2 m-3 btn btn-warning" @click="navigate('createrecipe')">Create New Recipe</button>
    </nav>
    <router-view></router-view>
</div>


<div v-else><MyBlog/></div>

</template>

<script>
import MyBlog from '@/components/MyBlog.vue';
import {  GET_USERNAME } from "../store/storeconstants";
export default {
  name: 'MyBlogView',
  data() {
    return {

    }
  },
  components: {
        MyBlog,
  },
  methods:{
    getUsername() {
      return this.$store.getters[`auth/${GET_USERNAME}`]
    }, 
    navigate(view) {
      this.$router.push({ name: view });
    }
  }
}
</script>

<style scoped>
  nav button {
    padding: 10px;
  }
</style>