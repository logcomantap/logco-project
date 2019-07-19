<template>
  <div>
    <nav
      class="navbar navbar-light bg-light d-flex justify-content-between"
      style="position: fixed; width: 100%"
    >
      <span class="navbar-brand mb-0 h1" @click="isMypost=false">LOGCO</span>
      <span class="navbar-brand mb-0 h1" @click="isMypost=true">My Posts</span>
      <span class="navbar-brand mb-0 h1" @click="signout">Signout</span>
    </nav>
    <div style="height: 5.5rem;">&nbsp;</div>
    <div v-if="!isMypost">
      <uploadpic @add-image="addLogo" />
    </div>
    <div v-if="!isMypost">
      <listlogos v-for="logo in logos" :key="logo._id" :mylogos="logo" />
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
      this.logos.push(payload);
    },
    signout(){
      localStorage.clear()
      this.$emit('check-login',false)
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
