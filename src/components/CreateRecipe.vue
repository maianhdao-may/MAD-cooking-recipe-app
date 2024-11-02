<template>
        <form class="creatRecipe">
            <legend>New Recipe</legend>
            <div class="mb-3">
                <label class="form-label" for="name">Name: </label>
                <input class="form-control" type="text" v-model="name1" name="name" required>
            </div>
            <div class="mb-3">
                <label class="form-label" for="category">Category: </label>
                <input class="form-control" type="text" v-model="category1" name="category" required>
            </div>
            <div class="mb-3">
                <label class="form-label" for="ingredient">Ingredients: </label>
                <input class="form-control" type="text" v-model="ingredient1" name="ingredient" required>
            </div>
            <div class="mb-3">
                <label class="form-label" for="instruction">Instruction: </label>
                <input class="form-control" type="text" v-model="instruction1" name="instruction" required>
            </div>
            <div class="form-check">
                <button class="btn btn-primary" type="submit" v-on:click.prevent = "post(name1, category1, ingredient1, instruction1)">Add</button>
            </div>
        </form>
        <div class="text-center font-weight-light font-italic"> {{ msg }}</div>
  </template>
  
  <script>
  export default {
    data: function() {
      return {
            name1: '',
            category1: '',
            ingredient1: '',
            instruction1:'',
            msg:'',
      }
    },

    methods: {
    post(name, category, ingredient, instruction) {
      //define url for api
      var postSQLApiURL = 'https://mercury.swin.edu.au/cos30043/s103806434/data/apis.php'
      var self = this;

      // POST request using fetch with error handling
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          category: category,
          ingredient: ingredient,
          instruction: instruction
        })
      };
		
		fetch(postSQLApiURL, requestOptions)
		.then( response =>{
             //turning the response into the usable data
             return response.json( );
		})
		.then( () =>{
            //This is the data you wanted to get from url
            self.msg = "Data Inserted Successfully."  ;
            this.$router.push('/myrecipe')
		})
		.catch(error => {
            self.msg = 'There was an error!' + error;
		});	
	
    }
}
  } 

</script>
<style scoped>
  form {
    width: 70%;
    margin-left: 10%;
    margin-right: 10%;
  }
</style>
  