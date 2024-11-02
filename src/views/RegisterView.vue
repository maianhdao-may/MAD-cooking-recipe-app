<template>
    <div class="registration">
      <Registration/>
    </div>
  </template>
  
  <script>
  // @ is an alias to /src
  import Registration from '@/components/RegistrationTest.vue'

  export default {
    name: 'RegisterView',
    data: function () {
       return{
      }
    }, 
    components: {
        Registration,
    }
  }
  </script>
  