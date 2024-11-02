<template>
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <router-link to="/" class="navbar-brand">
      <img src="./assets/logo.png" alt="logo" width="100px" height="100px" class="d-inline-block align-text-top">
    </router-link> 
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav">
        <router-link to="/" class="nav-link">Home</router-link> 
        <router-link to="/search" class="nav-link">Search</router-link> 
        <router-link to="/login" class="nav-link">Login</router-link>
        <router-link to="/register" class="nav-link">Sign Up</router-link>
        <router-link to="/myBlog" class="nav-link">My Blog</router-link>
      </div>
    </div>
  </div>
</nav>

  <nav class="navigation-bar">
    <ul>
    </ul>
  </nav>
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.header {
  text-align: center;
  width: 100%;
  height: fit-content;
  background-color: bisque;
  margin: 10px 0px 20px 0px;
  padding: 80px;
} 

</style>
