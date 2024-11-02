// export default router

import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import MyBlogView from '../views/MyBlogView.vue';
import SearchView from '../views/SearchView.vue';
import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';
import FavoriteList from '../components/FavoriteList.vue';
import CreateRecipe from '@/components/CreateRecipe.vue';
import MyRecipe from '../components/MyRecipe.vue';
// import MyRecipeView from '../views/MyRecipeView.vue';

const routes = [
    { path: '/', name: 'home', component: HomeView },
    { path: '/search', name: 'search', component: SearchView },
    { path: '/login', name: 'login', component: LoginView },
    { path: '/register', name: 'register', component: RegisterView },
    { path: '/myBlog', name: 'myBlog', component: MyBlogView,
    children: [
        {
          path: '/favorite',
          name: 'favorite',
          component: FavoriteList
        },
        {
          path: '/myrecipe',
          name: 'myrecipe',
          component: MyRecipe
        },
        {
          path: '/createrecipe',
          name: 'createrecipe',
          component: CreateRecipe
        }
      ] 

    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
    linkActiveClass: 'active'
});



export default router;
