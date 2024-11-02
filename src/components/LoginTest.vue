<template>
        <div class="login-container">
        <form name="login-form" class="login-form">
            <h2>Login</h2>
            <div class="form-group">
                <label for="username">Username: </label>
                <input type="text" v-model="input.username" name="username" required>
            </div>
            <div class="form-group">
                <label for="password">Password: </label>
                <input type="password" v-model="input.password" name="password" required>
            </div>
            <div class="form-check">
                <span><button class="btn btn-primary" type="submit" v-on:click.prevent = "login()">Login</button> </span>
                <span><button type="button" class="btn btn-secondary" v-on:click="reset()">Reset</button></span>
            </div>
        </form>
        <div class="error" v-if="msg">{{ msg }}</div>
    </div>
</template>

<script>
import { SET_AUTHENTICATION, SET_USERNAME } from "../store/storeconstants";
export default {
    data() {
        return {
            msg:'',
            input: {
                username: "",
                password: ""
            },
        }
    },
    methods: {
        login() {
            if (this.validateInputs()) {
                var self = this; 
                    // GET request using fetch with error handling
                const requestOptions = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username: this.input.username,
                        password: this.input.password 
                    })
                };
                
                fetch("https://mercury.swin.edu.au/cos30043/s103806434/data/api_user.php", requestOptions)
                .then( response =>{
                        //turning the response into the usable data
                        return response.json( );
                })
                .then( data =>{ 
                    if (data == null) {
                        self.msg="username or password incorrect.";
                        this.$store.commit(`auth/${SET_AUTHENTICATION}`, false);
                    }
                    else{
                        this.$emit("authenticated", true);//$emit() function allows you to pass custom events up the component tree.

                        //commit username and authenticated from action 
                        this.$store.commit(`auth/${SET_AUTHENTICATION}`, true);
                        this.$store.commit(`auth/${SET_USERNAME}`, this.input.username);
                        this.$router.push('/myBlog')
                    }
                })
                .catch(error => {
                    self.msg = "Error: "+error;
                });
            }
        },

        //validate input 
        validateInputs() {
            this.msg = '';
            if (!this.input.username) {
                this.msg = 'Username is required';
                return false;
            }
            if (this.input.username.length > 10) {
                this.msg = 'Username must be less than 10 characters';
                return false;
            }
            if (!this.input.password) {
                this.msg = 'Password is required';
                return false;
            }
            if (this.input.password.length < 8) {
                this.msg = 'Password must be more than 8 characters';
                return false;
            }
            return true;
        },

        //reset form
        reset() {
            this.input.username = "";
            this.input.password = "";
            this.msg = '';
        }
    },
}
</script>

<style scoped>
.login-form {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    background-color: bisque;
}
.error {
    text-align: center;
    color: red;
    margin-top: 10px;
    font-style: italic;
}

.login-form {
    width: 300px;
    height: auto;
}

.form-check {
    margin-top: 10px;
}
span {
    padding: 10px;
}
</style>