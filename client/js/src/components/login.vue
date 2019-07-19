<template>
  <div>
    <div v-if="isLogin">
      <navbar @check-login="checks"/>
    </div> 
    <form class="form-signin" @submit.prevent="login" v-if="!isLogin">
      <img
        class="mb-4"
        src="../../../img/ade782dd-8dc9-4fe3-a482-8d217a90d3a8_200x200.png"
        alt
        width="150"
        height="150"
        style="margin-left: 80px"
      />
      <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
      <label for="inputEmail" class="sr-only">Email address</label>
      <input
        type="email"
        id="inputEmail"
        class="form-control"
        placeholder="Email address"
        required
        autofocus
        v-model="email"
      />
      <label for="inputPassword" class="sr-only">Password</label>
      <input
        type="password"
        id="inputPassword"
        class="form-control"
        placeholder="Password"
        required
        v-model="password"
      />
      <div class="checkbox mb-3">
        <label>
          <input type="checkbox" value="remember-me" /> Remember me
        </label>
      </div>
      <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
    </form>
  </div>
</template>

<script>
import navbar from "./navbar";

export default {
  components: {
    navbar
  },
  data() {
    return {
      email: "",
      password: "",
      isLogin: false,
      logo : ''
    };
  },
  methods: {
    login() {
      axios
        .post("http://localhost:3000/users/login", {
          email: this.email,
          password: this.password
        })
        .then(({ data }) => {
          console.log(data);
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", data.user);
          this.isLogin = true;
        })
        .catch(err => {
          console.log(err.response.data);
        });
    },
    checks(payload){
      this.isLogin = payload
    }
  },
  created() {
    if(localStorage.getItem('token')){
      this.isLogin = true
    }
  }
};
</script>

<style>
</style>
