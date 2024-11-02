<template>
    <div class="login">
      <LoginTest/>
    </div>
  </template>
  
  <script>
  // @ is an alias to /src
  import LoginTest from '@/components/LoginTest.vue'

  export default {
    name: 'LoginView',
    data: function () {
       return{
        authenticated: false,
        authenticatedUser: '',
        error:false,
        errorMsg:'',
      }
    },
   mounted() {
        if(!this.authenticated) {
                this.$router.replace({ name: "login" });
            }
        },
	methods: {
		setAuthenticated(status) {
			this.authenticated = status;
		},
	},  
    components: {
      LoginTest,
    }
  }
  </script>
  