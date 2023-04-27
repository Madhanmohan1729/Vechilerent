<template>
    <div class="signup-container">
        <h1 class="signup-title">Sign Up</h1>
        <div class="signup-form">
            <input class="signup-input" type="text" placeholder="Enter Name" v-model=" signupdetails.name" />
            <input class="signup-input" type="text" placeholder="Email" v-model=" signupdetails.email" />
            <input class="signup-input" type="password" placeholder="Password" v-model=" signupdetails.password" />
            <button class="signup-button" @click="signup">Sign Up</button>
            <button class="signup-button" @click="toLogin">Already Having Account</button>
        </div>
    </div>
</template>
  
<script>
import axios from 'axios'
export default {
    name: 'signUp',
    data() {
        return {
          signupdetails:   {
                name: '',
                email: '',
                password: ''
            }
        }
    },
    methods: {
        signup() {



            // console.log("user details", this.signupdetails);

            axios.post("http://192.168.0.128:8000/api/register", {
                name: this. signupdetails.name,
                email: this. signupdetails.email,
                password: this. signupdetails.password
            })
                .then((response) => {

                    console.log(response);
                    if (response.status == 201) {
                        this.$router.push("/login");

                    }

                })
                .catch((error) => {

                    console.log(error);

                });



        },
        toLogin() {
            this.$router.push("/login");
        },

    }
}
</script>
  
<style scoped>
.signup-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
}

.signup-title {
    font-size: 3rem;
    margin-bottom: 2rem;
}

.signup-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 20rem;
}

.signup-input {
    padding: 1rem;
    margin-bottom: 1rem;
    border: none;
    border-radius: 0.5rem;
    box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.2);
    width: 100%;
    font-size: 1rem;
}

.signup-button {
    padding: 1rem;
    margin-top: 1rem;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 0.5rem;
    box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.2);
    font-size: 1rem;
    cursor: pointer;
}

.signup-button:hover {
    background-color: #3e8e41;
}
</style>
  