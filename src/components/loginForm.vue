<template>
    <div class="login-container">
        <h1 class="login-title">Login</h1>
        <div class="login-form">
            <input class="login-input" type="text" placeholder="Enter Email" v-model="logindetails.email" />
            <input class="login-input" type="password" placeholder="Password" v-model="logindetails.password" />

            <button class="login-button" @click="login">Login</button>
            <button class="login-button" @click="toSignUp">New User</button>
        </div>
    </div>
</template>
  
<script>
import axios from 'axios'
export default {
    name: 'loginForm',
    data() {
        return {
            logindetails: {
                email: '',
                password: ''
            }
        }
    },
    methods: {
        login() {
            var email_value = this.logindetails.email;
            var pwd_value = this.logindetails.password;
            const userdetails = {
                email: email_value,
                password: pwd_value
            }


            console.log("user details", userdetails);

            axios.post("http://192.168.0.128:8000/api/login", {
                email: email_value,
                password: pwd_value
            })
                .then((response) => {
                    console.log(response);
                    if (response.status == 200) {
                        this.$router.push("/vehicles");
                    }

                const token = response.data.access_token;
                    console.log(token);
                    window.localStorage.setItem("vehicleToken", token);

                })
                .catch((error) => {
                    console.log("axios login error: ", error.response.data);

                });


        },
        toSignUp() {
            this.$router.push("/signup");
        },
    }
}
</script>
  
<style scoped>
.login-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
}

.login-title {
    font-size: 3rem;
    margin-bottom: 2rem;
}

.login-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 20rem;
}

.login-input {
    padding: 1rem;
    margin-bottom: 1rem;
    border: none;
    border-radius: 0.5rem;
    box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.2);
    width: 100%;
    font-size: 1rem;
}

.login-button {
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

.login-button:hover {
    background-color: #3e8e41;
}
</style>
  