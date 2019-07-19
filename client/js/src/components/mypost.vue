<template>
  <div>
    <listlogos v-for="logo in logos" :key="logo._id" :mylogos="logo" />
  </div>
</template>

<script>
import listlogos from "./listogos";
export default {
  components: {
    listlogos
  },
  data() {
    return {
      logos: []
    };
  },
  created() {
    axios({
      method: "GET",
      url: `http://localhost:3000/logos/owner`,
      headers: {
        token: localStorage.getItem("token")
      }
    })
      .then(({ data }) => {
        this.logos = data;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style>
</style>
