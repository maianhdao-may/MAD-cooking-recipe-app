<template>
    <form name="signup-form" class="signup-form">
        <h2>Sign Up</h2>
        <div class="form-group">
            <label for="username">Username: </label>
            <input type="text" v-model="username1" name="username" required>
        </div>
        <div class="form-group">
            <label for="password">Password: </label>
            <input type="password" v-model="password1" name="password" required>
        </div>
        <div class="form-check">
            <span><button class="btn btn-primary" type="submit" v-on:click.prevent = "signup(username1, password1)">Sign Up</button> </span>
            <span><button type="button" class="btn btn-secondary" v-on:click="reset()">Reset</button></span>
        </div>
    </form>
    <div class="error" v-if="msg">{{ msg }}</div>
</template>

<script>
export default {
    data: function() {
        return {
            msg:'',
            username1:'',
            password1:''
        }
    },
    methods: {
        signup(username, password) {
            if (this.validateInputs()) {
                var postSQLApiURL = 'https://mercury.swin.edu.au/cos30043/s103806434/data/api_register.php'
                var self = this;
                const requestOptions = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username: username,
                        password: password,
                    })
                };
                fetch(postSQLApiURL, requestOptions)
                .then (response => {
                    return response.json();
                })
                .then( () => {
                    self.msg = "Register successfully.";
                    this.$router.push('/login')
                })
                .catch(error => {
                self.msg = 'There was an error!' + error;
                 });	
            }
        },
        validateInputs() {
                this.msg = '';
                if (!this.username1) {
                    this.msg = 'Username is required';
                    return false;
                }
                if (this.username1.length > 10) {
                    this.msg = 'Username must be less than 10 characters';
                    return false;
                }
                if (!this.password1) {
                    this.msg = 'Password is required';
                    return false;
                }
                if (this.password1.length < 8) {
                    this.msg = 'Password must be more than 8 characters';
                    return false;
                }
                return true;
            },
        reset() {
            this.input.username = "";
            this.input.password = "";
            this.msg = '';
        }
    },
}
</script>

<style scoped>
.signup-form {
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

.signup-form {
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