<template>
  <div>
    <img :src="mylogos.picture" alt="logo" />
    <p>{{mylogos.name}}</p>
    <p>{{mylogos.description}}</p>
    <button @click="deleteLogos(mylogos._id)" v-if="checkUser(mylogos.user_id)">delete</button>
  </div>
</template>

<script>
export default {
  name: "each-logo",
  props: ["mylogos"],
  created() {
    console.log("lislogos");
    console.log(this.mylogos);
  },
  methods: {
    checkUser(id) {
        console.log('check');
        console.log(localStorage.getItem("user"));
        
      if (localStorage.getItem("user") == id) {
        return true;
      } else {
        return false;
      }
    },
    deleteLogos(id) {
      axios({
        method: "DELETE",
        url: `http://localhost:3000/logos`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          console.log(data,'====');
          
        let index = this.mylogos.indexOf(data);
          this.mylogos.splice(index,1);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style>
</style>
