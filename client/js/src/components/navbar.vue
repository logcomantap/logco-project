<template>
  <div>
    <nav
      class="navbar navbar-light bg-light d-flex justify-content-between"
      style="position: fixed; width: 100%"
    >
      <span class="navbar-brand mb-0 h1" @click="isMypost=false">LOGCO</span>
      
      <span class="navbar-brand mb-0 h1" @click="signout">Signout</span>
    </nav>
    <div style="height: 3rem;">&nbsp;</div>
    <div v-if="!isMypost">
      <uploadpic @add-image="addLogo" />
    </div>
    <div v-if="!isMypost">
      <div class="row" style="height: 500px; width: 100%">
    <div class="col-sm-2" id="sidebar">
      <ul class="list-group list-group-flush" id="list-sidebar">
        <li class="list-group-item" style="background-color: #3E93DA; text-align: center">Menu</li>
        <li class="list-group-item list-sidebar-child"><a href="#" style="text-decoration: none; color: black;" data-toggle="modal"
      data-target="#addarticlemodal"
      data-whatever="@mdo">
    Upload
            logo</a></li>
        <li class="list-group-item list-sidebar-child" @click="isMypost=true">My Posts</li>
      
      </ul>
    </div>
      <div class="col-sm-10" style="padding: 30px;">
        <h1 style="text-align: center">Welcome, {{username}}</h1>
        <p style="text-align: center; padding-bottom: 20px">
          <img src="https://raw.githubusercontent.com/logcomantap/logco-project/kholis/client/img/wavy-line.png" />
        </p>
        <div class="d-flex flex-row justify-content-center" border style="margin: 10px">
        <listlogos v-for="logo in logos" :key="logo._id" :mylogos="logo" @delete-logo="deleted" />
        </div>
      </div>
    </div>
    </div>
    <div>
      <mypost v-if="isMypost" />
    </div>
  </div>
</template>

<script>
import mypost from "./mypost";
import listlogos from "./listogos";
import uploadpic from "./uploadpic";

export default {
  components: {
    mypost,
    listlogos,
    uploadpic
  },
  data() {
    return {
      isMypost: false,
      logos: []
    };
  },
  computed: {
    username(){
      return localStorage.getItem('name')
    }
  },
  methods: {
    findAll() {
      axios({
        method: "GET",
        url: `http://localhost:3000/logos/all`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          console.log(data, "created");

          this.logos = data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    addLogo(payload) {
      this.logos.unshift(payload);
    },
    signout() {
      localStorage.clear();
      this.$emit("check-login", false);
    },
    deleted(payload) {
      let index = this.logos.indexOf(payload);
      this.logos.splice(index, 1);
    }
  },
  created() {
    if (localStorage.getItem("token")) {
      this.findAll();
    }
  }
};
</script>

<style>
</style>
