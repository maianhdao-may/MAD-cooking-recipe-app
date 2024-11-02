<template>
      <div class="meal-card" v-for="recipe in myrecipe" :key="recipe.id">
        <h4>Name: {{recipe.name}}</h4>
        <p>Category: {{ recipe.category }} </p>
        <p>Ingredient: {{ recipe.ingredient }}</p>
        <p>Instruction: {{ recipe.instruction }}</p>
        <button @click="deleteRecipe(recipe.id)">Delete</button>
      </div>
      <div v-if="myrecipe.length === 0" class="fs-2 text-center">Let's create your own recipe</div>
  </template>
  
  <script>
  export default {
    data: function() {
      return {
        myrecipe:[],
        msg:''
      }
    },

  methods:{

    // function for delate button
    deleteRecipe(id) {
      var delSQLApiURL =  'https://mercury.swin.edu.au/cos30043/s103806434/data/apis.php/id/'+ id;
      var self = this;
      // DELETE request using fetch with error handling
      const requestOptions = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: id
        })
      };

      fetch(delSQLApiURL, requestOptions)
      .then( response =>{
        //turning the response into the usable data
        return response.json( );
      })
      .then( () =>{
        //This is the data you wanted to get from url
        this.myrecipe = this.myrecipe.filter(recipe => recipe.id !== id);
        self.msg = "Data deleted Successfully"
        
      })
      .catch(error => {
        self.msg = 'There was an error!';
        self.statusText = error;
      });	
    }
  },
  
  created() {
    var self = this
    var readSQLApiURL = 'https://mercury.swin.edu.au/cos30043/s103806434/data/apis.php' //define url for api
    // GET request using fetch with error handling
      fetch(readSQLApiURL )
      .then( response =>{
      //turning the response into the usable data
      return response.json( );
      })
      .then( data =>{
      //This is the data you wanted to get from url
      self.myrecipe=data;
      })
      .catch(error => {
      self.errorMessage = error;
      }); 
  }
} 


</script>
<style scoped>
.meal-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  margin: 16px 0;
  text-align: center;
  background-color: #f9f9f9;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}
</style>
  